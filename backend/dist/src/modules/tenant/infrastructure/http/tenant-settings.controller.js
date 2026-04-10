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
exports.TenantSettingsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const GetPasswordPolicyUseCase_1 = require("../../application/use-cases/GetPasswordPolicyUseCase");
const UpdatePasswordPolicyUseCase_1 = require("../../application/use-cases/UpdatePasswordPolicyUseCase");
const password_policy_dto_1 = require("../../application/dto/password-policy.dto");
let TenantSettingsController = class TenantSettingsController {
    getPasswordPolicy;
    updatePasswordPolicy;
    constructor(getPasswordPolicy, updatePasswordPolicy) {
        this.getPasswordPolicy = getPasswordPolicy;
        this.updatePasswordPolicy = updatePasswordPolicy;
    }
    async getPolicy(req) {
        return this.getPasswordPolicy.execute(req.user.tenantId);
    }
    async updatePolicy(req, dto) {
        return this.updatePasswordPolicy.execute(req.user.tenantId, dto);
    }
};
exports.TenantSettingsController = TenantSettingsController;
__decorate([
    (0, common_1.Get)('password-policy'),
    (0, swagger_1.ApiOperation)({ summary: 'RF-1.05: Obtener política de caducidad de contraseña del tenant' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: password_policy_dto_1.PasswordPolicyResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'No autenticado' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TenantSettingsController.prototype, "getPolicy", null);
__decorate([
    (0, common_1.Put)('password-policy'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'RF-1.05: Actualizar política de caducidad de contraseña del tenant' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: password_policy_dto_1.PasswordPolicyResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'No autenticado' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Valor de caducidad inválido' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, password_policy_dto_1.UpdatePasswordPolicyDto]),
    __metadata("design:returntype", Promise)
], TenantSettingsController.prototype, "updatePolicy", null);
exports.TenantSettingsController = TenantSettingsController = __decorate([
    (0, swagger_1.ApiTags)('Tenant Settings (DOM-1 RF-1.05)'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Controller)('tenants/settings'),
    __metadata("design:paramtypes", [GetPasswordPolicyUseCase_1.GetPasswordPolicyUseCase,
        UpdatePasswordPolicyUseCase_1.UpdatePasswordPolicyUseCase])
], TenantSettingsController);
//# sourceMappingURL=tenant-settings.controller.js.map