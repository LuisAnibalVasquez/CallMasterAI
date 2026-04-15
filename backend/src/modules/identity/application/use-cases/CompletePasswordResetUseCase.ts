import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import * as crypto from 'crypto';
import type { IUserRepository } from '../../domain/repositories/IUserRepository';
import type { IPasswordResetTokenRepository } from '../../domain/repositories/IPasswordResetTokenRepository';
import type { IPasswordHasher } from '../ports/IPasswordHasher';
import { IDENTITY_TOKENS } from '../constants/injection-tokens';
import { CompletePasswordResetDto } from '../dto/auth.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class CompletePasswordResetUseCase {
  constructor(
    @Inject(IDENTITY_TOKENS.USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(IDENTITY_TOKENS.PASSWORD_RESET_TOKEN_REPOSITORY)
    private readonly tokenRepository: IPasswordResetTokenRepository,
    @Inject(IDENTITY_TOKENS.PASSWORD_HASHER)
    private readonly passwordHasher: IPasswordHasher,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(dto: CompletePasswordResetDto): Promise<void> {
    // In a real scenario with hashes, we would need the plain token's corresponding user,
    // or we pass a token in the format "userId:plainToken" to easily find it,
    // or we just find by hash if we use a deterministic hash like SHA256 instead of bcrypt for tokens.
    // For simplicity, let's assume dto.token is NOT bcrypt hashed, but SHA256 hashed in DB,
    // OR we use the token itself as the hash for the repo lookup if it is a cryptographically secure random string.
    // Let's modify the conceptual logic: the port `findByTokenHash` will receive the hashed version of the token.

    // Actually, bcrypt is slow for table scanning. Standard practice: token in email is "tokenId:plainSalt",
    // or we use crypto.createHash('sha256').
    // To strictly avoid changing many ports now, we will look up by assuming the frontend sends the token
    // and we had saved the hash. Wait, if it's bcrypt we CANNOT lookup by hash!
    // We must pass plainToken and hash it with SHA256 before saving to DB!
    // For this use case, let's assume `findByTokenHash` expects the SHA256 representation of the token.

    const tokenSha256 = crypto
      .createHash('sha256')
      .update(dto.token)
      .digest('hex');

    const resetToken = await this.tokenRepository.findByTokenHash(tokenSha256);

    if (!resetToken) {
      throw new BadRequestException('Token inválido');
    }

    if (resetToken.isExpired()) {
      throw new BadRequestException('El token ha expirado');
    }

    if (resetToken.isUsed()) {
      throw new BadRequestException('El token ya fue utilizado');
    }

    const user = await this.userRepository.findById(resetToken.userId);
    if (!user || !user.isActive) {
      throw new BadRequestException('Usuario inválido o inactivo');
    }

    user.passwordHash = await this.passwordHasher.hash(dto.newPassword);
    user.mustChangePassword = false;
    user.passwordLastChangedAt = new Date();

    resetToken.markAsUsed();

    await this.userRepository.save(user);
    await this.tokenRepository.save(resetToken);

    this.eventEmitter.emit('user.password_reset_completed', {
      userId: user.id,
    });
  }
}
