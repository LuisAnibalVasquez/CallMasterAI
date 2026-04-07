import type { IUserRepository } from '../../domain/repositories/IUserRepository';
import type { IPasswordHasher } from '../ports/IPasswordHasher';
import { ChangePasswordRequestDto } from '../dto/auth.dto';
export declare class ChangePasswordUseCase {
    private readonly userRepository;
    private readonly passwordHasher;
    constructor(userRepository: IUserRepository, passwordHasher: IPasswordHasher);
    execute(userId: string, dto: ChangePasswordRequestDto): Promise<void>;
}
