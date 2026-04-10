"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantSettings = exports.DEFAULT_PASSWORD_EXPIRY_DAYS = void 0;
exports.DEFAULT_PASSWORD_EXPIRY_DAYS = 90;
class TenantSettings {
    tenantId;
    passwordExpiryDays;
    updatedAt;
    constructor(tenantId, passwordExpiryDays, updatedAt) {
        this.tenantId = tenantId;
        this.passwordExpiryDays = passwordExpiryDays;
        this.updatedAt = updatedAt;
    }
    static isValidExpiryDays(days) {
        return [30, 60, 90, 180].includes(days);
    }
}
exports.TenantSettings = TenantSettings;
//# sourceMappingURL=TenantSettings.js.map