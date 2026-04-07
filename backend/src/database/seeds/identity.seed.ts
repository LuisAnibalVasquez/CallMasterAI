import { AppDataSource } from '../../config/data-source';
import { RoleOrmEntity } from '../../modules/identity/infrastructure/persistence/role.orm-entity';
import { UserOrmEntity } from '../../modules/identity/infrastructure/persistence/user.orm-entity';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

async function runSeed() {
  await AppDataSource.initialize();
  console.log('Seeding Identity Data...');

  const roleRepo = AppDataSource.getRepository(RoleOrmEntity);
  const userRepo = AppDataSource.getRepository(UserOrmEntity);

  // Seed Roles
  const roles = [
    { id: uuidv4(), name: 'PlatformOwner', description: 'Dueño de la plataforma CallMasterAI' },
    { id: uuidv4(), name: 'TenantAdmin', description: 'Administrador de Inquilino/Tenant' },
  ];

  for (const r of roles) {
    const existing = await roleRepo.findOneBy({ name: r.name });
    if (!existing) {
      const role = roleRepo.create(r);
      await roleRepo.save(role);
      console.log(`Created role: ${r.name}`);
    }
  }

  // Seed PlatformOwner
  const pwHash = await bcrypt.hash('Admin123!', 10);
  const ownerRole = await roleRepo.findOneBy({ name: 'PlatformOwner' });
  
  if (ownerRole) {
    const existingOwner = await userRepo.findOneBy({ email: 'owner@callmaster.ai' });
    if (!existingOwner) {
      const owner = userRepo.create({
        id: uuidv4(),
        email: 'owner@callmaster.ai',
        passwordHash: pwHash,
        roleId: ownerRole.id,
        tenantId: null,
        mustChangePassword: true,
        passwordLastChangedAt: new Date(),
        isActive: true,
      });
      await userRepo.save(owner);
      console.log('Created user: owner@callmaster.ai');
    }
  }

  // Seed TenantAdmin (Mock Tenant)
  const tenantRole = await roleRepo.findOneBy({ name: 'TenantAdmin' });
  const mockTenantId = uuidv4();
  if (tenantRole) {
    const existingTenantAdmin = await userRepo.findOneBy({ email: 'admin@tenant.com' });
    if (!existingTenantAdmin) {
      const tenantAdmin = userRepo.create({
        id: uuidv4(),
        email: 'admin@tenant.com',
        passwordHash: pwHash,
        roleId: tenantRole.id,
        tenantId: mockTenantId,
        mustChangePassword: true,
        passwordLastChangedAt: new Date(),
        isActive: true,
      });
      await userRepo.save(tenantAdmin);
      console.log(`Created user: admin@tenant.com for Mock Tenant ${mockTenantId}`);
    }
  }

  console.log('Seed completo.');
  await AppDataSource.destroy();
}

runSeed().catch(err => {
  console.error('Seed Error:', err);
  process.exit(1);
});
