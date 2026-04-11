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
exports.RoleRepositoryImpl = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const Role_1 = require("../../domain/entities/Role");
const role_orm_entity_1 = require("./role.orm-entity");
let RoleRepositoryImpl = class RoleRepositoryImpl {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async findByName(name) {
        const orm = await this.repository.findOneBy({ name });
        if (!orm)
            return null;
        return new Role_1.Role(orm.id, orm.name, orm.description);
    }
    async findById(id) {
        const orm = await this.repository.findOneBy({ id });
        if (!orm)
            return null;
        return new Role_1.Role(orm.id, orm.name, orm.description);
    }
    async save(role) {
        const orm = this.repository.create({
            id: role.id,
            name: role.name,
            description: role.description,
        });
        await this.repository.save(orm);
    }
};
exports.RoleRepositoryImpl = RoleRepositoryImpl;
exports.RoleRepositoryImpl = RoleRepositoryImpl = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(role_orm_entity_1.RoleOrmEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RoleRepositoryImpl);
//# sourceMappingURL=role.repository.impl.js.map