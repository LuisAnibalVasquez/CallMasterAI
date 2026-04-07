"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdentityModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const role_orm_entity_1 = require("./infrastructure/persistence/role.orm-entity");
const user_orm_entity_1 = require("./infrastructure/persistence/user.orm-entity");
const password_reset_token_orm_entity_1 = require("./infrastructure/persistence/password-reset-token.orm-entity");
const injection_tokens_1 = require("./application/constants/injection-tokens");
const user_repository_impl_1 = require("./infrastructure/persistence/user.repository.impl");
const password_reset_token_repository_impl_1 = require("./infrastructure/persistence/password-reset-token.repository.impl");
const bcrypt_password_hasher_1 = require("./infrastructure/security/bcrypt-password.hasher");
const jwt_token_service_1 = require("./infrastructure/security/jwt-token.service");
const jwt_strategy_1 = require("./infrastructure/security/jwt.strategy");
const LoginUseCase_1 = require("./application/use-cases/LoginUseCase");
const ChangePasswordUseCase_1 = require("./application/use-cases/ChangePasswordUseCase");
const RequestPasswordResetUseCase_1 = require("./application/use-cases/RequestPasswordResetUseCase");
const CompletePasswordResetUseCase_1 = require("./application/use-cases/CompletePasswordResetUseCase");
const auth_controller_1 = require("./infrastructure/http/auth.controller");
const repositories = [
    {
        provide: injection_tokens_1.IDENTITY_TOKENS.USER_REPOSITORY,
        useClass: user_repository_impl_1.UserRepositoryImpl,
    },
    {
        provide: injection_tokens_1.IDENTITY_TOKENS.PASSWORD_RESET_TOKEN_REPOSITORY,
        useClass: password_reset_token_repository_impl_1.PasswordResetTokenRepositoryImpl,
    },
];
const securityServices = [
    {
        provide: injection_tokens_1.IDENTITY_TOKENS.PASSWORD_HASHER,
        useClass: bcrypt_password_hasher_1.BcryptPasswordHasher,
    },
    {
        provide: injection_tokens_1.IDENTITY_TOKENS.TOKEN_SERVICE,
        useClass: jwt_token_service_1.JwtTokenService,
    },
    jwt_strategy_1.JwtStrategy,
];
const useCases = [
    LoginUseCase_1.LoginUseCase,
    ChangePasswordUseCase_1.ChangePasswordUseCase,
    RequestPasswordResetUseCase_1.RequestPasswordResetUseCase,
    CompletePasswordResetUseCase_1.CompletePasswordResetUseCase,
];
let IdentityModule = class IdentityModule {
};
exports.IdentityModule = IdentityModule;
exports.IdentityModule = IdentityModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                role_orm_entity_1.RoleOrmEntity,
                user_orm_entity_1.UserOrmEntity,
                password_reset_token_orm_entity_1.PasswordResetTokenOrmEntity,
            ]),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    secret: configService.get('auth.jwtSecret') || 'secretKey',
                    signOptions: { expiresIn: '8h' },
                }),
            }),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [
            ...repositories,
            ...securityServices,
            ...useCases,
        ],
        exports: [],
    })
], IdentityModule);
//# sourceMappingURL=identity.module.js.map