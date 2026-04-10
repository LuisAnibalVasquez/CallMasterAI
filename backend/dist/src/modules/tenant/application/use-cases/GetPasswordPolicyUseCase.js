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
exports.GetPasswordPolicyUseCase = void 0;
const common_1 = require("@nestjs/common");
const TenantSettings_1 = require("../../domain/entities/TenantSettings");
const injection_tokens_1 = require("../constants/injection-tokens");
let GetPasswordPolicyUseCase = class GetPasswordPolicyUseCase {
    settingsRepository;
    constructor(settingsRepository) {
        this.settingsRepository = settingsRepository;
    }
    async execute(tenantId) {
        const settings = await this.settingsRepository.findByTenantId(tenantId);
        if (!settings) {
            return {
                tenantId,
                passwordExpiryDays: TenantSettings_1.DEFAULT_PASSWORD_EXPIRY_DAYS,
                updatedAt: new Date(),
            };
        }
        return {
            tenantId: settings.tenantId,
            passwordExpiryDays: settings.passwordExpiryDays,
            updatedAt: settings.updatedAt,
        };
    }
};
exports.GetPasswordPolicyUseCase = GetPasswordPolicyUseCase;
exports.GetPasswordPolicyUseCase = GetPasswordPolicyUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(injection_tokens_1.TENANT_TOKENS.SETTINGS_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], GetPasswordPolicyUseCase);
//# sourceMappingURL=GetPasswordPolicyUseCase.js.map