import {
  Inject,
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import type { IUserRepository } from '../../domain/repositories/IUserRepository';
import type { IPasswordHasher } from '../ports/IPasswordHasher';
import { IDENTITY_TOKENS } from '../constants/injection-tokens';
import { ChangePasswordRequestDto } from '../dto/auth.dto';

@Injectable()
export class ChangePasswordUseCase {
  constructor(
    @Inject(IDENTITY_TOKENS.USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(IDENTITY_TOKENS.PASSWORD_HASHER)
    private readonly passwordHasher: IPasswordHasher,
  ) {}

  async execute(userId: string, dto: ChangePasswordRequestDto): Promise<void> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    const isCurrentValid = await this.passwordHasher.compare(
      dto.currentPassword,
      user.passwordHash,
    );
    if (!isCurrentValid) {
      throw new BadRequestException('La contraseña actual es incorrecta');
    }

    user.passwordHash = await this.passwordHasher.hash(dto.newPassword);
    user.mustChangePassword = false;
    user.passwordLastChangedAt = new Date();

    await this.userRepository.save(user);
  }
}
