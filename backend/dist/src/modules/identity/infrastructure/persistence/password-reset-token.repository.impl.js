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
exports.PasswordResetTokenRepositoryImpl = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const PasswordResetToken_1 = require("../../domain/entities/PasswordResetToken");
const password_reset_token_orm_entity_1 = require("./password-reset-token.orm-entity");
let PasswordResetTokenRepositoryImpl = class PasswordResetTokenRepositoryImpl {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async findByTokenHash(tokenHash) {
        const orm = await this.repo.findOneBy({ tokenHash });
        if (!orm)
            return null;
        return new PasswordResetToken_1.PasswordResetToken(orm.id, orm.userId, orm.tokenHash, orm.expiresAt, orm.usedAt, orm.createdAt);
    }
    async save(token) {
        const orm = new password_reset_token_orm_entity_1.PasswordResetTokenOrmEntity();
        orm.id = token.id;
        orm.userId = token.userId;
        orm.tokenHash = token.tokenHash;
        orm.expiresAt = token.expiresAt;
        orm.usedAt = token.usedAt;
        await this.repo.save(orm);
    }
};
exports.PasswordResetTokenRepositoryImpl = PasswordResetTokenRepositoryImpl;
exports.PasswordResetTokenRepositoryImpl = PasswordResetTokenRepositoryImpl = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(password_reset_token_orm_entity_1.PasswordResetTokenOrmEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PasswordResetTokenRepositoryImpl);
//# sourceMappingURL=password-reset-token.repository.impl.js.map