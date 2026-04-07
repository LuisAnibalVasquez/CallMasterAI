import { PasswordResetToken } from '../entities/PasswordResetToken';
export interface IPasswordResetTokenRepository {
    findByTokenHash(tokenHash: string): Promise<PasswordResetToken | null>;
    save(token: PasswordResetToken): Promise<void>;
}
