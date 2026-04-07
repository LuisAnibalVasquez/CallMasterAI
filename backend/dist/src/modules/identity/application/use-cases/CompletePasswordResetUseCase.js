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
exports.CompletePasswordResetUseCase = void 0;
const common_1 = require("@nestjs/common");
const injection_tokens_1 = require("../constants/injection-tokens");
const event_emitter_1 = require("@nestjs/event-emitter");
let CompletePasswordResetUseCase = class CompletePasswordResetUseCase {
    userRepository;
    tokenRepository;
    passwordHasher;
    eventEmitter;
    constructor(userRepository, tokenRepository, passwordHasher, eventEmitter) {
        this.userRepository = userRepository;
        this.tokenRepository = tokenRepository;
        this.passwordHasher = passwordHasher;
        this.eventEmitter = eventEmitter;
    }
    async execute(dto) {
        const crypto = require('crypto');
        const tokenSha256 = crypto.createHash('sha256').update(dto.token).digest('hex');
        const resetToken = await this.tokenRepository.findByTokenHash(tokenSha256);
        if (!resetToken) {
            throw new common_1.BadRequestException('Token inválido');
        }
        if (resetToken.isExpired()) {
            throw new common_1.BadRequestException('El token ha expirado');
        }
        if (resetToken.isUsed()) {
            throw new common_1.BadRequestException('El token ya fue utilizado');
        }
        const user = await this.userRepository.findById(resetToken.userId);
        if (!user || !user.isActive) {
            throw new common_1.BadRequestException('Usuario inválido o inactivo');
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
};
exports.CompletePasswordResetUseCase = CompletePasswordResetUseCase;
exports.CompletePasswordResetUseCase = CompletePasswordResetUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(injection_tokens_1.IDENTITY_TOKENS.USER_REPOSITORY)),
    __param(1, (0, common_1.Inject)(injection_tokens_1.IDENTITY_TOKENS.PASSWORD_RESET_TOKEN_REPOSITORY)),
    __param(2, (0, common_1.Inject)(injection_tokens_1.IDENTITY_TOKENS.PASSWORD_HASHER)),
    __metadata("design:paramtypes", [Object, Object, Object, event_emitter_1.EventEmitter2])
], CompletePasswordResetUseCase);
//# sourceMappingURL=CompletePasswordResetUseCase.js.map