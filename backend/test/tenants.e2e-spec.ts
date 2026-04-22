import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { AppDataSource } from '../src/config/data-source';
import { RoleOrmEntity } from '../src/modules/identity/infrastructure/persistence/role.orm-entity';
import { UserOrmEntity } from '../src/modules/identity/infrastructure/persistence/user.orm-entity';
import { SystemRole } from '../src/modules/identity/domain/enums/SystemRole.enum';
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

    let ownerRole = await roleRepo.findOneBy({ name: SystemRole.PlatformOwner });
    if (!ownerRole) {
      ownerRole = await roleRepo.save(
        roleRepo.create({
          id: randomUUID(),
          name: SystemRole.PlatformOwner,
          description: 'Owner',
        }),
      );
    }

    const tenantRole = await roleRepo.findOneBy({ name: SystemRole.TenantAdmin });
    if (!tenantRole) {
      await roleRepo.save(
        roleRepo.create({
          id: randomUUID(),
          name: SystemRole.TenantAdmin,
          description: 'Tenant',
        }),
      );
    }

    const email = 'e2e-owner@callmaster.ai';
    let ownerUser = await userRepo.findOneBy({ email });
    if (!ownerUser) {
      const pwHash = await bcrypt.hash('Admin123!', 10);
      ownerUser = await userRepo.save(
        userRepo.create({
          id: randomUUID(),
          email: email,
          passwordHash: pwHash,
          roleId: ownerRole.id,
          tenantId: null,
          mustChangePassword: false,
          passwordLastChangedAt: new Date(),
          isActive: true,
        }),
      );
    }

    // Login to get token
    const server = app.getHttpServer() as import('http').Server;
    const loginResponse = await request(server)
      .post('/api/v1/auth/login')
      .send({
        email: email,
        password: 'Admin123!',
      });

    authToken = (loginResponse.body as { token: string }).token;
  });

  it('GET /api/v1/tenants should return 401 without token', () => {
    const server = app.getHttpServer() as import('http').Server;
    return request(server).get('/api/v1/tenants').expect(401);
  });

  it('POST /api/v1/tenants should create a new tenant', async () => {
    const tenantName = `Tenant ${Date.now()}`;
    const server = app.getHttpServer() as import('http').Server;
    const response = await request(server)
      .post('/api/v1/tenants')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        name: tenantName,
        adminEmail: `admin@e2e-${Date.now()}.com`,
        phone: '+5491122334455',
        isActive: true,
      })
      .expect(201);

    const body = response.body as { name: string; temporaryPassword: string };
    expect(body.name).toBe(tenantName);
    expect(body.temporaryPassword).toBe('Admin123!');
  });

  it('GET /api/v1/tenants should list tenants', async () => {
    const server = app.getHttpServer() as import('http').Server;
    const response = await request(server)
      .get('/api/v1/tenants')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);

    const body = response.body as unknown[];
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThan(0);
  });

  afterAll(async () => {
    await app.close();
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
  });
});
