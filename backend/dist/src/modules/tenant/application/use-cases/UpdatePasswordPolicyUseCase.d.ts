import { EventEmitter2 } from '@nestjs/event-emitter';
import type { ITenantSettingsRepository } from '../../domain/repositories/ITenantSettingsRepository';
import { UpdatePasswordPolicyDto, PasswordPolicyResponseDto } from '../dto/password-policy.dto';
export declare class UpdatePasswordPolicyUseCase {
    private readonly settingsRepository;
    private readonly eventEmitter;
    constructor(settingsRepository: ITenantSettingsRepository, eventEmitter: EventEmitter2);
    execute(tenantId: string, dto: UpdatePasswordPolicyDto): Promise<PasswordPolicyResponseDto>;
}
