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
exports.ChangePasswordUseCase = void 0;
const common_1 = require("@nestjs/common");
const injection_tokens_1 = require("../constants/injection-tokens");
let ChangePasswordUseCase = class ChangePasswordUseCase {
    userRepository;
    passwordHasher;
    constructor(userRepository, passwordHasher) {
        this.userRepository = userRepository;
        this.passwordHasher = passwordHasher;
    }
    async execute(userId, dto) {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new common_1.UnauthorizedException('Usuario no encontrado');
        }
        const isCurrentValid = await this.passwordHasher.compare(dto.currentPassword, user.passwordHash);
        if (!isCurrentValid) {
            throw new common_1.BadRequestException('La contraseña actual es incorrecta');
        }
        user.passwordHash = await this.passwordHasher.hash(dto.newPassword);
        user.mustChangePassword = false;
        user.passwordLastChangedAt = new Date();
        await this.userRepository.save(user);
    }
};
exports.ChangePasswordUseCase = ChangePasswordUseCase;
exports.ChangePasswordUseCase = ChangePasswordUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(injection_tokens_1.IDENTITY_TOKENS.USER_REPOSITORY)),
    __param(1, (0, common_1.Inject)(injection_tokens_1.IDENTITY_TOKENS.PASSWORD_HASHER)),
    __metadata("design:paramtypes", [Object, Object])
], ChangePasswordUseCase);
//# sourceMappingURL=ChangePasswordUseCase.js.map