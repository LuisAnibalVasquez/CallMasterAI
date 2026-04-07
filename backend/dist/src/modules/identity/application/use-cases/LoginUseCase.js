"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUseCase = void 0;
const common_1 = require("@nestjs/common");
const injection_tokens_1 = require("../constants/injection-tokens");
const AuthResult_1 = require("../../domain/value-objects/AuthResult");
let LoginUseCase = class LoginUseCase {
    userRepository;
    passwordHasher;
    tokenService;
    constructor(userRepository, passwordHasher, tokenService) {
        this.userRepository = userRepository;
        this.passwordHasher = passwordHasher;
        this.tokenService = tokenService;
    }
    async execute(dto) {
        const user = await this.userRepository.findByEmail(dto.email);
        if (!user || !user.isActive) {
            throw new common_1.UnauthorizedException('Credenciales inválidas');
        }
        const isPasswordValid = await this.passwordHasher.compare(dto.password, user.passwordHash);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Credenciales inválidas');
        }
        user.lastLoginAt = new Date();
        await this.userRepository.save(user);
        const token = await this.tokenService.generateToken({
            sub: user.id,
            email: user.email,
            roleId: user.roleId,
            tenantId: user.tenantId,
            mustChangePassword: user.mustChangePassword,
        });
        return new AuthResult_1.AuthResult(true, token, user.id, user.roleId, user.mustChangePassword);
    }
};
exports.LoginUseCase = LoginUseCase;
exports.LoginUseCase = LoginUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(injection_tokens_1.IDENTITY_TOKENS.USER_REPOSITORY)),
    __param(1, (0, common_1.Inject)(injection_tokens_1.IDENTITY_TOKENS.PASSWORD_HASHER)),
    __param(2, (0, common_1.Inject)(injection_tokens_1.IDENTITY_TOKENS.TOKEN_SERVICE)),
    __metadata("design:paramtypes", [Object, Object, Object])
], LoginUseCase);
//# sourceMappingURL=LoginUseCase.js.map