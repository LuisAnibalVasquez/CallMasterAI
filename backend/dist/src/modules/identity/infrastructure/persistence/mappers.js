"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdentityMappers = void 0;
const User_1 = require("../../domain/entities/User");
const user_orm_entity_1 = require("./user.orm-entity");
class IdentityMappers {
    static toDomainUser(ormUser) {
        return new User_1.User(ormUser.id, ormUser.email, ormUser.passwordHash, ormUser.roleId, ormUser.tenantId, ormUser.mustChangePassword, ormUser.passwordLastChangedAt, ormUser.isActive, ormUser.createdAt, ormUser.lastLoginAt);
    }
    static toOrmUser(domainUser) {
        const orm = new user_orm_entity_1.UserOrmEntity();
        orm.id = domainUser.id;
        orm.email = domainUser.email;
        orm.passwordHash = domainUser.passwordHash;
        orm.roleId = domainUser.roleId;
        orm.tenantId = domainUser.tenantId;
        orm.mustChangePassword = domainUser.mustChangePassword;
        orm.passwordLastChangedAt = domainUser.passwordLastChangedAt;
        orm.isActive = domainUser.isActive;
        orm.lastLoginAt = domainUser.lastLoginAt;
        return orm;
    }
}
exports.IdentityMappers = IdentityMappers;
//# sourceMappingURL=mappers.js.map