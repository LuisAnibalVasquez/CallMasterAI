"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../../config/data-source");
const role_orm_entity_1 = require("../../modules/identity/infrastructure/persistence/role.orm-entity");
const user_orm_entity_1 = require("../../modules/identity/infrastructure/persistence/user.orm-entity");
const bcrypt = __importStar(require("bcrypt"));
const uuid_1 = require("uuid");
async function runSeed() {
    await data_source_1.AppDataSource.initialize();
    console.log('Seeding Identity Data...');
    const roleRepo = data_source_1.AppDataSource.getRepository(role_orm_entity_1.RoleOrmEntity);
    const userRepo = data_source_1.AppDataSource.getRepository(user_orm_entity_1.UserOrmEntity);
    const roles = [
        { id: (0, uuid_1.v4)(), name: 'PlatformOwner', description: 'Dueño de la plataforma CallMasterAI' },
        { id: (0, uuid_1.v4)(), name: 'TenantAdmin', description: 'Administrador de Inquilino/Tenant' },
    ];
    for (const r of roles) {
        const existing = await roleRepo.findOneBy({ name: r.name });
        if (!existing) {
            const role = roleRepo.create(r);
            await roleRepo.save(role);
            console.log(`Created role: ${r.name}`);
        }
    }
    const pwHash = await bcrypt.hash('Admin123!', 10);
    const ownerRole = await roleRepo.findOneBy({ name: 'PlatformOwner' });
    if (ownerRole) {
        const existingOwner = await userRepo.findOneBy({ email: 'owner@callmaster.ai' });
        if (!existingOwner) {
            const owner = userRepo.create({
                id: (0, uuid_1.v4)(),
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
    const tenantRole = await roleRepo.findOneBy({ name: 'TenantAdmin' });
    const mockTenantId = (0, uuid_1.v4)();
    if (tenantRole) {
        const existingTenantAdmin = await userRepo.findOneBy({ email: 'admin@tenant.com' });
        if (!existingTenantAdmin) {
            const tenantAdmin = userRepo.create({
                id: (0, uuid_1.v4)(),
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
    await data_source_1.AppDataSource.destroy();
}
runSeed().catch(err => {
    console.error('Seed Error:', err);
    process.exit(1);
});
//# sourceMappingURL=identity.seed.js.map