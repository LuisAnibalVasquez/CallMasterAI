import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { AppDataSource } from '../src/config/data-source';
import { RoleOrmEntity } from '../src/modules/identity/infrastructure/persistence/role.orm-entity';
import { UserOrmEntity } from '../src/modules/identity/infrastructure/persistence/user.orm-entity';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';

describe('TenantsController (e2e)', () => {
  let app: INestApplication;
  let authToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    app.setGlobalPrefix('api/v1');
    await app.init();

    // Ensure database is initialized and seeded for the test
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    
    const roleRepo = AppDataSource.getRepository(RoleOrmEntity);
    const userRepo = AppDataSource.getRepository(UserOrmEntity);

    let ownerRole = await roleRepo.findOneBy({ name: 'PlatformOwner' });
    if (!ownerRole) {
      ownerRole = await roleRepo.save(roleRepo.create({
        id: randomUUID(),
        name: 'PlatformOwner',
        description: 'Owner'
      }));
    }

    let tenantRole = await roleRepo.findOneBy({ name: 'TenantAdmin' });
    if (!tenantRole) {
      await roleRepo.save(roleRepo.create({
        id: randomUUID(),
        name: 'TenantAdmin',
        description: 'Tenant'
      }));
    }

    const email = 'e2e-owner@callmaster.ai';
    let ownerUser = await userRepo.findOneBy({ email });
    if (!ownerUser) {
      const pwHash = await bcrypt.hash('Admin123!', 10);
      ownerUser = await userRepo.save(userRepo.create({
        id: randomUUID(),
        email: email,
        passwordHash: pwHash,
        roleId: ownerRole.id,
        tenantId: null,
        mustChangePassword: false,
        passwordLastChangedAt: new Date(),
        isActive: true,
      }));
    }

    // Login to get token
    const loginResponse = await request(app.getHttpServer())
      .post('/api/v1/auth/login')
      .send({
        email: email,
        password: 'Admin123!',
      });
    
    authToken = loginResponse.body.token;
  });

  it('GET /api/v1/tenants should return 401 without token', () => {
    return request(app.getHttpServer())
      .get('/api/v1/tenants')
      .expect(401);
  });

  it('POST /api/v1/tenants should create a new tenant', async () => {
    const tenantName = `Tenant ${Date.now()}`;
    const response = await request(app.getHttpServer())
      .post('/api/v1/tenants')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        name: tenantName,
        adminEmail: `admin@e2e-${Date.now()}.com`,
        phone: '+5491122334455',
        isActive: true
      })
      .expect(201);

    expect(response.body.name).toBe(tenantName);
    expect(response.body.temporaryPassword).toBe('Admin123!');
  });

  it('GET /api/v1/tenants should list tenants', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/tenants')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  afterAll(async () => {
    await app.close();
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
  });
});
