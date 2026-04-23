import { Inject, Injectable, Logger } from '@nestjs/common';
import type { IUserRepository } from '../../domain/repositories/IUserRepository';
import type { IPasswordResetTokenRepository } from '../../domain/repositories/IPasswordResetTokenRepository';
import type { IPasswordHasher } from '../ports/IPasswordHasher';
import { IDENTITY_TOKENS } from '../constants/injection-tokens';
import { RequestPasswordResetDto } from '../dto/auth.dto';
import { PasswordResetToken } from '../../domain/entities/PasswordResetToken';
import { randomBytes, createHash, randomUUID } from 'node:crypto';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class RequestPasswordResetUseCase {
  private readonly logger = new Logger(RequestPasswordResetUseCase.name);

  constructor(
    @Inject(IDENTITY_TOKENS.USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(IDENTITY_TOKENS.PASSWORD_RESET_TOKEN_REPOSITORY)
    private readonly tokenRepository: IPasswordResetTokenRepository,
    @Inject(IDENTITY_TOKENS.PASSWORD_HASHER)
    private readonly passwordHasher: IPasswordHasher,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(dto: RequestPasswordResetDto): Promise<void> {
    const user = await this.userRepository.findByEmail(dto.email);

    // RF-1.04 generic response: we always return success immediately to avoid email enumeration
    if (!user?.isActive) {
      this.logger.warn(
        `Intento de recuperación para email inválido o inactivo: ${dto.email}`,
      );
      return;
    }

    const plainToken = randomBytes(32).toString('hex');
    const tokenHash = createHash('sha256').update(plainToken).digest('hex');

    // Expira en 30 minutos
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 30);

    const resetToken = new PasswordResetToken(
      randomUUID(),
      user.id,
      tokenHash,
      expiresAt,
      null,
      new Date(),
    );

    await this.tokenRepository.save(resetToken);

    // Emit event for Notification module to send email
    this.eventEmitter.emit('user.password_recovery_requested', {
      userId: user.id,
      email: user.email,
      plainToken: plainToken, // Solo se transfiere por memoria para el email, nunca guardado
    });
  }
}
