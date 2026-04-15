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
exports.TenantsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const CreateTenantUseCase_1 = require("../../application/use-cases/CreateTenantUseCase");
const GetTenantsUseCase_1 = require("../../application/use-cases/GetTenantsUseCase");
const ToggleTenantStatusUseCase_1 = require("../../application/use-cases/ToggleTenantStatusUseCase");
const create_tenant_dto_1 = require("./dto/create-tenant.dto");
const roles_guard_1 = require("../../../../common/guards/roles.guard");
const roles_decorator_1 = require("../../../../common/decorators/roles.decorator");
let TenantsController = class TenantsController {
    createTenantUseCase;
    getTenantsUseCase;
    toggleTenantStatusUseCase;
    constructor(createTenantUseCase, getTenantsUseCase, toggleTenantStatusUseCase) {
        this.createTenantUseCase = createTenantUseCase;
        this.getTenantsUseCase = getTenantsUseCase;
        this.toggleTenantStatusUseCase = toggleTenantStatusUseCase;
    }
    async createTenant(dto) {
        return this.createTenantUseCase.execute(dto);
    }
    async getTenants() {
        return this.getTenantsUseCase.execute();
    }
    async toggleStatus(id) {
        return this.toggleTenantStatusUseCase.execute(id);
    }
};
exports.TenantsController = TenantsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'RF-2.01, RF-2.02: Crear un nuevo tenant y su usuario administrador inicial' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Tenant creado exitosamente' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_tenant_dto_1.CreateTenantDto]),
    __metadata("design:returntype", Promise)
], TenantsController.prototype, "createTenant", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'RF-2.03: Listar todos los tenants registrados' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de tenants' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TenantsController.prototype, "getTenants", null);
__decorate([
    (0, common_1.Put)(':id/toggle-status'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'RF-2.04: Activar/desactivar un tenant' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Estado del tenant actualizado' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TenantsController.prototype, "toggleStatus", null);
exports.TenantsController = TenantsController = __decorate([
    (0, swagger_1.ApiTags)('Tenants (DOM-1 RF-2.01, RF-2.02)'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('PlatformOwner'),
    (0, common_1.Controller)('tenants'),
    __metadata("design:paramtypes", [CreateTenantUseCase_1.CreateTenantUseCase,
        GetTenantsUseCase_1.GetTenantsUseCase,
        ToggleTenantStatusUseCase_1.ToggleTenantStatusUseCase])
], TenantsController);
//# sourceMappingURL=tenants.controller.js.map