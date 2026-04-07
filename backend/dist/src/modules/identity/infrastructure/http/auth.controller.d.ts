import { LoginUseCase } from '../../application/use-cases/LoginUseCase';
import { ChangePasswordUseCase } from '../../application/use-cases/ChangePasswordUseCase';
import { RequestPasswordResetUseCase } from '../../application/use-cases/RequestPasswordResetUseCase';
import { CompletePasswordResetUseCase } from '../../application/use-cases/CompletePasswordResetUseCase';
import { LoginRequestDto, ChangePasswordRequestDto, RequestPasswordResetDto, CompletePasswordResetDto } from '../../application/dto/auth.dto';
export declare class AuthController {
    private readonly loginUseCase;
    private readonly changePasswordUseCase;
    private readonly requestResetUseCase;
    private readonly completeResetUseCase;
    constructor(loginUseCase: LoginUseCase, changePasswordUseCase: ChangePasswordUseCase, requestResetUseCase: RequestPasswordResetUseCase, completeResetUseCase: CompletePasswordResetUseCase);
    login(dto: LoginRequestDto): Promise<import("../../domain/value-objects/AuthResult").AuthResult>;
    changePassword(req: any, dto: ChangePasswordRequestDto): Promise<{
        message: string;
    }>;
    forgotPassword(dto: RequestPasswordResetDto): Promise<{
        message: string;
    }>;
    resetPassword(dto: CompletePasswordResetDto): Promise<{
        message: string;
    }>;
}
