"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthResult = void 0;
class AuthResult {
    success;
    token;
    userId;
    roleId;
    roleName;
    mustChangePassword;
    errorMessage;
    constructor(success, token = null, userId = null, roleId = null, roleName = null, mustChangePassword = false, errorMessage = null) {
        this.success = success;
        this.token = token;
        this.userId = userId;
        this.roleId = roleId;
        this.roleName = roleName;
        this.mustChangePassword = mustChangePassword;
        this.errorMessage = errorMessage;
    }
}
exports.AuthResult = AuthResult;
//# sourceMappingURL=AuthResult.js.map