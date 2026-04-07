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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const LoginUseCase_1 = require("../../application/use-cases/LoginUseCase");
const ChangePasswordUseCase_1 = require("../../application/use-cases/ChangePasswordUseCase");
const RequestPasswordResetUseCase_1 = require("../../application/use-cases/RequestPasswordResetUseCase");
const CompletePasswordResetUseCase_1 = require("../../application/use-cases/CompletePasswordResetUseCase");
const auth_dto_1 = require("../../application/dto/auth.dto");
const passport_1 = require("@nestjs/passport");
let AuthController = class AuthController {
    loginUseCase;
    changePasswordUseCase;
    requestResetUseCase;
    completeResetUseCase;
    constructor(loginUseCase, changePasswordUseCase, requestResetUseCase, completeResetUseCase) {
        this.loginUseCase = loginUseCase;
        this.changePasswordUseCase = changePasswordUseCase;
        this.requestResetUseCase = requestResetUseCase;
        this.completeResetUseCase = completeResetUseCase;
    }
    async login(dto) {
        return await this.loginUseCase.execute(dto);
    }
    async changePassword(req, dto) {
        await this.changePasswordUseCase.execute(req.user.userId, dto);
        return { message: 'Contraseña actualizada' };
    }
    async forgotPassword(dto) {
        await this.requestResetUseCase.execute(dto);
        return { message: 'Si el correo existe, se enviarán las instrucciones de recuperación.' };
    }
    async resetPassword(dto) {
        await this.completeResetUseCase.execute(dto);
        return { message: 'Contraseña restablecida exitosamente' };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'RF-1.01: Iniciar sesión en el portal' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Sesión iniciada correctamente' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Credenciales inválidas' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.LoginRequestDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('change-password'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'RF-1.03: Cambiar contraseña (usuario autenticado)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Contraseña cambiada exitosamente' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, auth_dto_1.ChangePasswordRequestDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Post)('forgot-password'),
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    (0, swagger_1.ApiOperation)({ summary: 'RF-1.04: Solicitar recuperación de contraseña (envía email)' }),
    (0, swagger_1.ApiResponse)({ status: 202, description: 'Recuperación solicitada' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.RequestPasswordResetDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgotPassword", null);
__decorate([
    (0, common_1.Post)('reset-password'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'RF-1.04: Completar restablecimiento de contraseña' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Contraseña restablecida' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.CompletePasswordResetDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('Identity (DOM-1)'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [LoginUseCase_1.LoginUseCase,
        ChangePasswordUseCase_1.ChangePasswordUseCase,
        RequestPasswordResetUseCase_1.RequestPasswordResetUseCase,
        CompletePasswordResetUseCase_1.CompletePasswordResetUseCase])
], AuthController);
//# sourceMappingURL=auth.controller.js.map