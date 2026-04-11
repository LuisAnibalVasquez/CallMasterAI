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
var RequestPasswordResetUseCase_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestPasswordResetUseCase = void 0;
const common_1 = require("@nestjs/common");
const injection_tokens_1 = require("../constants/injection-tokens");
const PasswordResetToken_1 = require("../../domain/entities/PasswordResetToken");
const crypto_1 = require("crypto");
const event_emitter_1 = require("@nestjs/event-emitter");
let RequestPasswordResetUseCase = RequestPasswordResetUseCase_1 = class RequestPasswordResetUseCase {
    userRepository;
    tokenRepository;
    passwordHasher;
    eventEmitter;
    logger = new common_1.Logger(RequestPasswordResetUseCase_1.name);
    constructor(userRepository, tokenRepository, passwordHasher, eventEmitter) {
        this.userRepository = userRepository;
        this.tokenRepository = tokenRepository;
        this.passwordHasher = passwordHasher;
        this.eventEmitter = eventEmitter;
    }
    async execute(dto) {
        const user = await this.userRepository.findByEmail(dto.email);
        if (!user || !user.isActive) {
            this.logger.warn(`Intento de recuperación para email inválido o inactivo: ${dto.email}`);
            return;
        }
        const plainToken = (0, crypto_1.randomBytes)(32).toString('hex');
        const tokenHash = (0, crypto_1.createHash)('sha256').update(plainToken).digest('hex');
        const expiresAt = new Date();
        expiresAt.setMinutes(expiresAt.getMinutes() + 30);
        const resetToken = new PasswordResetToken_1.PasswordResetToken((0, crypto_1.randomUUID)(), user.id, tokenHash, expiresAt, null, new Date());
        await this.tokenRepository.save(resetToken);
        this.eventEmitter.emit('user.password_recovery_requested', {
            userId: user.id,
            email: user.email,
            plainToken: plainToken,
        });
    }
};
exports.RequestPasswordResetUseCase = RequestPasswordResetUseCase;
exports.RequestPasswordResetUseCase = RequestPasswordResetUseCase = RequestPasswordResetUseCase_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(injection_tokens_1.IDENTITY_TOKENS.USER_REPOSITORY)),
    __param(1, (0, common_1.Inject)(injection_tokens_1.IDENTITY_TOKENS.PASSWORD_RESET_TOKEN_REPOSITORY)),
    __param(2, (0, common_1.Inject)(injection_tokens_1.IDENTITY_TOKENS.PASSWORD_HASHER)),
    __metadata("design:paramtypes", [Object, Object, Object, event_emitter_1.EventEmitter2])
], RequestPasswordResetUseCase);
//# sourceMappingURL=RequestPasswordResetUseCase.js.map