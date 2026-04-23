import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import type { IUserRepository } from '../../domain/repositories/IUserRepository';
import type { IPasswordHasher } from '../ports/IPasswordHasher';
import type { ITokenService } from '../ports/ITokenService';
import { IDENTITY_TOKENS } from '../constants/injection-tokens';
import { LoginRequestDto } from '../dto/auth.dto';
import { AuthResult } from '../../domain/value-objects/AuthResult';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject(IDENTITY_TOKENS.USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(IDENTITY_TOKENS.PASSWORD_HASHER)
    private readonly passwordHasher: IPasswordHasher,
    @Inject(IDENTITY_TOKENS.TOKEN_SERVICE)
    private readonly tokenService: ITokenService,
  ) {}

  async execute(dto: LoginRequestDto): Promise<AuthResult> {
    const user = await this.userRepository.findByEmail(dto.email);

    if (!user?.isActive) {
      // RF-1.01: Generic error message to prevent enumeration
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const isPasswordValid = await this.passwordHasher.compare(
      dto.password,
      user.passwordHash,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Actualizar ultimo ingreso
    user.lastLoginAt = new Date();
    await this.userRepository.save(user);

    const token = await this.tokenService.generateToken({
      sub: user.id,
      email: user.email,
      roleId: user.roleId,
      roleName: user.roleName || '',
      tenantId: user.tenantId,
      mustChangePassword: user.mustChangePassword,
    });

    return new AuthResult(
      true,
      token,
      user.id,
      user.roleId,
      user.roleName,
      user.mustChangePassword,
    );
  }
}
