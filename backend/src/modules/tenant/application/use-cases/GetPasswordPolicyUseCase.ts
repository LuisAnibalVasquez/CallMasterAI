import { Inject, Injectable } from '@nestjs/common';
import type { ITenantSettingsRepository } from '../../domain/repositories/ITenantSettingsRepository';
import { DEFAULT_PASSWORD_EXPIRY_DAYS } from '../../domain/entities/TenantSettings';
import { PasswordPolicyResponseDto } from '../dto/password-policy.dto';
import { TENANT_TOKENS } from '../constants/injection-tokens';

@Injectable()
export class GetPasswordPolicyUseCase {
  constructor(
    @Inject(TENANT_TOKENS.SETTINGS_REPOSITORY)
    private readonly settingsRepository: ITenantSettingsRepository,
  ) {}

  async execute(tenantId: string): Promise<PasswordPolicyResponseDto> {
    const settings = await this.settingsRepository.findByTenantId(tenantId);

    if (!settings) {
      // RF-1.05: Si no hay configuración, se aplica el valor por defecto (90 días)
      return {
        tenantId,
        passwordExpiryDays: DEFAULT_PASSWORD_EXPIRY_DAYS,
        updatedAt: new Date(),
      };
    }

    return {
      tenantId: settings.tenantId,
      passwordExpiryDays: settings.passwordExpiryDays,
      updatedAt: settings.updatedAt,
    };
  }
}
