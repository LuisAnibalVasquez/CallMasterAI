import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import type { ITenantSettingsRepository } from '../../domain/repositories/ITenantSettingsRepository';
import { TenantSettings } from '../../domain/entities/TenantSettings';
import { UpdatePasswordPolicyDto, PasswordPolicyResponseDto } from '../dto/password-policy.dto';
import { TENANT_TOKENS } from '../constants/injection-tokens';

@Injectable()
export class UpdatePasswordPolicyUseCase {
  constructor(
    @Inject(TENANT_TOKENS.SETTINGS_REPOSITORY)
    private readonly settingsRepository: ITenantSettingsRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(
    tenantId: string,
    dto: UpdatePasswordPolicyDto,
  ): Promise<PasswordPolicyResponseDto> {
    const settings = new TenantSettings(tenantId, dto.passwordExpiryDays, new Date());
    await this.settingsRepository.save(settings);

    // RF-8.10: Registrar evento de auditoría
    this.eventEmitter.emit('tenant.password_policy.updated', {
      tenantId,
      newExpiryDays: dto.passwordExpiryDays,
      occurredAt: new Date(),
    });

    return {
      tenantId: settings.tenantId,
      passwordExpiryDays: settings.passwordExpiryDays,
      updatedAt: settings.updatedAt,
    };
  }
}
