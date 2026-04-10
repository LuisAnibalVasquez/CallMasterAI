import type { ITenantSettingsRepository } from '../../domain/repositories/ITenantSettingsRepository';
import { PasswordPolicyResponseDto } from '../dto/password-policy.dto';
export declare class GetPasswordPolicyUseCase {
    private readonly settingsRepository;
    constructor(settingsRepository: ITenantSettingsRepository);
    execute(tenantId: string): Promise<PasswordPolicyResponseDto>;
}
