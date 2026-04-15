import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TenantSettingsOrmEntity } from './infrastructure/persistence/tenant-settings.orm-entity';
import { TenantOrmEntity } from './infrastructure/persistence/orm-entities/Tenant.orm-entity';
import { TenantSettingsRepositoryImpl } from './infrastructure/persistence/tenant-settings.repository.impl';
import { TenantRepositoryImpl } from './infrastructure/persistence/tenant.repository.impl';
import { UserProvisioningAdapter } from './infrastructure/adapters/UserProvisioningAdapter';
import { TenantSettingsController } from './infrastructure/http/tenant-settings.controller';
import { TenantsController } from './infrastructure/http/tenants.controller';
import { GetPasswordPolicyUseCase } from './application/use-cases/GetPasswordPolicyUseCase';
import { UpdatePasswordPolicyUseCase } from './application/use-cases/UpdatePasswordPolicyUseCase';
import { CreateTenantUseCase } from './application/use-cases/CreateTenantUseCase';
import { GetTenantsUseCase } from './application/use-cases/GetTenantsUseCase';
import { ToggleTenantStatusUseCase } from './application/use-cases/ToggleTenantStatusUseCase';
import { TENANT_TOKENS } from './application/constants/injection-tokens';
import { IdentityModule } from '../identity/identity.module';
import { IDENTITY_TOKENS } from '../identity/application/constants/injection-tokens';

@Module({
  imports: [
    TypeOrmModule.forFeature([TenantSettingsOrmEntity, TenantOrmEntity]),
    IdentityModule,
  ],
  controllers: [TenantSettingsController, TenantsController],
  providers: [
    // Repository adapters (DIP)
    {
      provide: TENANT_TOKENS.SETTINGS_REPOSITORY,
      useClass: TenantSettingsRepositoryImpl,
    },
    {
      provide: TENANT_TOKENS.TENANT_REPOSITORY,
      useClass: TenantRepositoryImpl,
    },
    {
      provide: TENANT_TOKENS.USER_PROVISIONING_SERVICE,
      useClass: UserProvisioningAdapter,
    },
    // Use Cases
    GetPasswordPolicyUseCase,
    UpdatePasswordPolicyUseCase,
    CreateTenantUseCase,
    GetTenantsUseCase,
    ToggleTenantStatusUseCase,
  ],
  exports: [TENANT_TOKENS.SETTINGS_REPOSITORY],
})
export class TenantModule {}
