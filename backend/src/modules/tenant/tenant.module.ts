import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TenantSettingsOrmEntity } from './infrastructure/persistence/tenant-settings.orm-entity';
import { TenantSettingsRepositoryImpl } from './infrastructure/persistence/tenant-settings.repository.impl';
import { TenantSettingsController } from './infrastructure/http/tenant-settings.controller';
import { GetPasswordPolicyUseCase } from './application/use-cases/GetPasswordPolicyUseCase';
import { UpdatePasswordPolicyUseCase } from './application/use-cases/UpdatePasswordPolicyUseCase';
import { TENANT_TOKENS } from './application/constants/injection-tokens';

@Module({
  imports: [TypeOrmModule.forFeature([TenantSettingsOrmEntity])],
  controllers: [TenantSettingsController],
  providers: [
    // Repository adapter (DIP)
    {
      provide: TENANT_TOKENS.SETTINGS_REPOSITORY,
      useClass: TenantSettingsRepositoryImpl,
    },
    // Use Cases
    GetPasswordPolicyUseCase,
    UpdatePasswordPolicyUseCase,
  ],
  exports: [TENANT_TOKENS.SETTINGS_REPOSITORY],
})
export class TenantModule {}
