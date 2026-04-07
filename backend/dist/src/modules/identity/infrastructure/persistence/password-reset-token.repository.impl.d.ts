import { Repository } from 'typeorm';
import { IPasswordResetTokenRepository } from '../../domain/repositories/IPasswordResetTokenRepository';
import { PasswordResetToken } from '../../domain/entities/PasswordResetToken';
import { PasswordResetTokenOrmEntity } from './password-reset-token.orm-entity';
export declare class PasswordResetTokenRepositoryImpl implements IPasswordResetTokenRepository {
    private readonly repo;
    constructor(repo: Repository<PasswordResetTokenOrmEntity>);
    findByTokenHash(tokenHash: string): Promise<PasswordResetToken | null>;
    save(token: PasswordResetToken): Promise<void>;
}
