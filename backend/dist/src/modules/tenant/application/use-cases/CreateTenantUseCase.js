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
exports.CreateTenantUseCase = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
const Tenant_1 = require("../../domain/entities/Tenant");
const injection_tokens_1 = require("../constants/injection-tokens");
const injection_tokens_2 = require("../../../identity/application/constants/injection-tokens");
let CreateTenantUseCase = class CreateTenantUseCase {
    tenantRepository;
    userProvisioningService;
    passwordHasher;
    STATIC_PASSWORD = 'Admin123!';
    constructor(tenantRepository, userProvisioningService, passwordHasher) {
        this.tenantRepository = tenantRepository;
        this.userProvisioningService = userProvisioningService;
        this.passwordHasher = passwordHasher;
    }
    async execute(request) {
        const isEmailAvailable = await this.userProvisioningService.isEmailAvailable(request.adminEmail);
        if (!isEmailAvailable) {
            throw new common_1.BadRequestException(`El email ${request.adminEmail} ya está en uso.`);
        }
        const tenantId = (0, crypto_1.randomUUID)();
        const tenant = new Tenant_1.Tenant({
            id: tenantId,
            name: request.name,
            phone: request.phone,
            adminEmail: request.adminEmail,
        });
        await this.tenantRepository.save(tenant);
        const passwordHash = await this.passwordHasher.hash(this.STATIC_PASSWORD);
        await this.userProvisioningService.provisionInitialUser({
            email: request.adminEmail,
            passwordHash,
            tenantId: tenant.id,
            roleName: 'TenantAdmin',
            mustChangePassword: true,
        });
        return {
            id: tenant.id,
            name: tenant.name,
            adminEmail: tenant.adminEmail,
            temporaryPassword: this.STATIC_PASSWORD,
        };
    }
};
exports.CreateTenantUseCase = CreateTenantUseCase;
exports.CreateTenantUseCase = CreateTenantUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(injection_tokens_1.TENANT_TOKENS.TENANT_REPOSITORY)),
    __param(1, (0, common_1.Inject)(injection_tokens_1.TENANT_TOKENS.USER_PROVISIONING_SERVICE)),
    __param(2, (0, common_1.Inject)(injection_tokens_2.IDENTITY_TOKENS.PASSWORD_HASHER)),
    __metadata("design:paramtypes", [Object, Object, Object])
], CreateTenantUseCase);
//# sourceMappingURL=CreateTenantUseCase.js.map