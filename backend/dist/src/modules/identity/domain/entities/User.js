"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    id;
    email;
    passwordHash;
    roleId;
    roleName;
    tenantId;
    mustChangePassword;
    passwordLastChangedAt;
    isActive;
    createdAt;
    lastLoginAt;
    constructor(id, email, passwordHash, roleId, roleName = null, tenantId, mustChangePassword, passwordLastChangedAt, isActive, createdAt, lastLoginAt) {
        this.id = id;
        this.email = email;
        this.passwordHash = passwordHash;
        this.roleId = roleId;
        this.roleName = roleName;
        this.tenantId = tenantId;
        this.mustChangePassword = mustChangePassword;
        this.passwordLastChangedAt = passwordLastChangedAt;
        this.isActive = isActive;
        this.createdAt = createdAt;
        this.lastLoginAt = lastLoginAt;
    }
    isPlatformOwner() {
        return this.tenantId === null;
    }
    activate() {
        this.isActive = true;
    }
    deactivate() {
        this.isActive = false;
    }
}
exports.User = User;
//# sourceMappingURL=User.js.map