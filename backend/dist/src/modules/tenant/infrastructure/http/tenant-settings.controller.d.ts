import { GetPasswordPolicyUseCase } from '../../application/use-cases/GetPasswordPolicyUseCase';
import { UpdatePasswordPolicyUseCase } from '../../application/use-cases/UpdatePasswordPolicyUseCase';
import { UpdatePasswordPolicyDto, PasswordPolicyResponseDto } from '../../application/dto/password-policy.dto';
export declare class TenantSettingsController {
    private readonly getPasswordPolicy;
    private readonly updatePasswordPolicy;
    constructor(getPasswordPolicy: GetPasswordPolicyUseCase, updatePasswordPolicy: UpdatePasswordPolicyUseCase);
    getPolicy(req: any): Promise<PasswordPolicyResponseDto>;
    updatePolicy(req: any, dto: UpdatePasswordPolicyDto): Promise<PasswordPolicyResponseDto>;
}
