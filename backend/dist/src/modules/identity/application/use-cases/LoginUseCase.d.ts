import type { IUserRepository } from '../../domain/repositories/IUserRepository';
import type { IPasswordHasher } from '../ports/IPasswordHasher';
import type { ITokenService } from '../ports/ITokenService';
import { LoginRequestDto } from '../dto/auth.dto';
import { AuthResult } from '../../domain/value-objects/AuthResult';
export declare class LoginUseCase {
    private readonly userRepository;
    private readonly passwordHasher;
    private readonly tokenService;
    constructor(userRepository: IUserRepository, passwordHasher: IPasswordHasher, tokenService: ITokenService);
    execute(dto: LoginRequestDto): Promise<AuthResult>;
}
