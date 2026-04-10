import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

import { RoleOrmEntity } from './infrastructure/persistence/role.orm-entity';
import { UserOrmEntity } from './infrastructure/persistence/user.orm-entity';
import { PasswordResetTokenOrmEntity } from './infrastructure/persistence/password-reset-token.orm-entity';

import { IDENTITY_TOKENS } from './application/constants/injection-tokens';
import { UserRepositoryImpl } from './infrastructure/persistence/user.repository.impl';
import { PasswordResetTokenRepositoryImpl } from './infrastructure/persistence/password-reset-token.repository.impl';
import { BcryptPasswordHasher } from './infrastructure/security/bcrypt-password.hasher';
import { JwtTokenService } from './infrastructure/security/jwt-token.service';
import { JwtStrategy } from './infrastructure/security/jwt.strategy';

import { LoginUseCase } from './application/use-cases/LoginUseCase';
import { ChangePasswordUseCase } from './application/use-cases/ChangePasswordUseCase';
import { RequestPasswordResetUseCase } from './application/use-cases/RequestPasswordResetUseCase';
import { CompletePasswordResetUseCase } from './application/use-cases/CompletePasswordResetUseCase';

import { AuthController } from './infrastructure/http/auth.controller';

const repositories = [
  {
    provide: IDENTITY_TOKENS.USER_REPOSITORY,
    useClass: UserRepositoryImpl,
  },
  {
    provide: IDENTITY_TOKENS.PASSWORD_RESET_TOKEN_REPOSITORY,
    useClass: PasswordResetTokenRepositoryImpl,
  },
];

const securityServices = [
  {
    provide: IDENTITY_TOKENS.PASSWORD_HASHER,
    useClass: BcryptPasswordHasher,
  },
  {
    provide: IDENTITY_TOKENS.TOKEN_SERVICE,
    useClass: JwtTokenService,
  },
  JwtStrategy,
];

const useCases = [
  LoginUseCase,
  ChangePasswordUseCase,
  RequestPasswordResetUseCase,
  CompletePasswordResetUseCase,
];

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RoleOrmEntity,
      UserOrmEntity,
      PasswordResetTokenOrmEntity,
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('auth.jwtSecret') || 'secretKey',
        signOptions: { expiresIn: '8h' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    ...repositories,
    ...securityServices,
    ...useCases,
  ],
  exports: [
    // Export if other modules need to auth or check users
  ],
})
export class IdentityModule {}
