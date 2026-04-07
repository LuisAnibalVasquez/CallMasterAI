import type { IUserRepository } from '../../domain/repositories/IUserRepository';
import type { IPasswordResetTokenRepository } from '../../domain/repositories/IPasswordResetTokenRepository';
import type { IPasswordHasher } from '../ports/IPasswordHasher';
import { RequestPasswordResetDto } from '../dto/auth.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
export declare class RequestPasswordResetUseCase {
    private readonly userRepository;
    private readonly tokenRepository;
    private readonly passwordHasher;
    private readonly eventEmitter;
    private readonly logger;
    constructor(userRepository: IUserRepository, tokenRepository: IPasswordResetTokenRepository, passwordHasher: IPasswordHasher, eventEmitter: EventEmitter2);
    execute(dto: RequestPasswordResetDto): Promise<void>;
}
