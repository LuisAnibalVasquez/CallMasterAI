"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const tenant_settings_orm_entity_1 = require("./infrastructure/persistence/tenant-settings.orm-entity");
const tenant_settings_repository_impl_1 = require("./infrastructure/persistence/tenant-settings.repository.impl");
const tenant_settings_controller_1 = require("./infrastructure/http/tenant-settings.controller");
const GetPasswordPolicyUseCase_1 = require("./application/use-cases/GetPasswordPolicyUseCase");
const UpdatePasswordPolicyUseCase_1 = require("./application/use-cases/UpdatePasswordPolicyUseCase");
const injection_tokens_1 = require("./application/constants/injection-tokens");
let TenantModule = class TenantModule {
};
exports.TenantModule = TenantModule;
exports.TenantModule = TenantModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([tenant_settings_orm_entity_1.TenantSettingsOrmEntity])],
        controllers: [tenant_settings_controller_1.TenantSettingsController],
        providers: [
            {
                provide: injection_tokens_1.TENANT_TOKENS.SETTINGS_REPOSITORY,
                useClass: tenant_settings_repository_impl_1.TenantSettingsRepositoryImpl,
            },
            GetPasswordPolicyUseCase_1.GetPasswordPolicyUseCase,
            UpdatePasswordPolicyUseCase_1.UpdatePasswordPolicyUseCase,
        ],
        exports: [injection_tokens_1.TENANT_TOKENS.SETTINGS_REPOSITORY],
    })
], TenantModule);
//# sourceMappingURL=tenant.module.js.map