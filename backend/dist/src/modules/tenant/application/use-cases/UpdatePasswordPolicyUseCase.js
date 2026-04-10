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
exports.UpdatePasswordPolicyUseCase = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const TenantSettings_1 = require("../../domain/entities/TenantSettings");
const injection_tokens_1 = require("../constants/injection-tokens");
let UpdatePasswordPolicyUseCase = class UpdatePasswordPolicyUseCase {
    settingsRepository;
    eventEmitter;
    constructor(settingsRepository, eventEmitter) {
        this.settingsRepository = settingsRepository;
        this.eventEmitter = eventEmitter;
    }
    async execute(tenantId, dto) {
        const settings = new TenantSettings_1.TenantSettings(tenantId, dto.passwordExpiryDays, new Date());
        await this.settingsRepository.save(settings);
        this.eventEmitter.emit('tenant.password_policy.updated', {
            tenantId,
            newExpiryDays: dto.passwordExpiryDays,
            occurredAt: new Date(),
        });
        return {
            tenantId: settings.tenantId,
            passwordExpiryDays: settings.passwordExpiryDays,
            updatedAt: settings.updatedAt,
        };
    }
};
exports.UpdatePasswordPolicyUseCase = UpdatePasswordPolicyUseCase;
exports.UpdatePasswordPolicyUseCase = UpdatePasswordPolicyUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(injection_tokens_1.TENANT_TOKENS.SETTINGS_REPOSITORY)),
    __metadata("design:paramtypes", [Object, event_emitter_1.EventEmitter2])
], UpdatePasswordPolicyUseCase);
//# sourceMappingURL=UpdatePasswordPolicyUseCase.js.map