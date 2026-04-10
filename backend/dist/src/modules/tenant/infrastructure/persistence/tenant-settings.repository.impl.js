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
exports.TenantSettingsRepositoryImpl = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const TenantSettings_1 = require("../../domain/entities/TenantSettings");
const tenant_settings_orm_entity_1 = require("./tenant-settings.orm-entity");
let TenantSettingsRepositoryImpl = class TenantSettingsRepositoryImpl {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async findByTenantId(tenantId) {
        const orm = await this.repo.findOneBy({ tenantId });
        if (!orm)
            return null;
        return new TenantSettings_1.TenantSettings(orm.tenantId, orm.passwordExpiryDays, orm.updatedAt);
    }
    async save(settings) {
        const orm = new tenant_settings_orm_entity_1.TenantSettingsOrmEntity();
        orm.tenantId = settings.tenantId;
        orm.passwordExpiryDays = settings.passwordExpiryDays;
        await this.repo.save(orm);
    }
};
exports.TenantSettingsRepositoryImpl = TenantSettingsRepositoryImpl;
exports.TenantSettingsRepositoryImpl = TenantSettingsRepositoryImpl = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tenant_settings_orm_entity_1.TenantSettingsOrmEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TenantSettingsRepositoryImpl);
//# sourceMappingURL=tenant-settings.repository.impl.js.map