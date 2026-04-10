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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordPolicyResponseDto = exports.UpdatePasswordPolicyDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class UpdatePasswordPolicyDto {
    passwordExpiryDays;
}
exports.UpdatePasswordPolicyDto = UpdatePasswordPolicyDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Días de caducidad de contraseña. Valores permitidos: 30, 60, 90 o 180.',
        enum: [30, 60, 90, 180],
        example: 90,
    }),
    (0, class_validator_1.IsIn)([30, 60, 90, 180], {
        message: 'passwordExpiryDays debe ser 30, 60, 90 o 180',
    }),
    __metadata("design:type", Number)
], UpdatePasswordPolicyDto.prototype, "passwordExpiryDays", void 0);
class PasswordPolicyResponseDto {
    tenantId;
    passwordExpiryDays;
    updatedAt;
}
exports.PasswordPolicyResponseDto = PasswordPolicyResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '3f4e5d6c-...' }),
    __metadata("design:type", String)
], PasswordPolicyResponseDto.prototype, "tenantId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 90, enum: [30, 60, 90, 180] }),
    __metadata("design:type", Number)
], PasswordPolicyResponseDto.prototype, "passwordExpiryDays", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], PasswordPolicyResponseDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=password-policy.dto.js.map