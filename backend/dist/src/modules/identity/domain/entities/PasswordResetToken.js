"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordResetToken = void 0;
class PasswordResetToken {
    id;
    userId;
    tokenHash;
    expiresAt;
    usedAt;
    createdAt;
    constructor(id, userId, tokenHash, expiresAt, usedAt, createdAt) {
        this.id = id;
        this.userId = userId;
        this.tokenHash = tokenHash;
        this.expiresAt = expiresAt;
        this.usedAt = usedAt;
        this.createdAt = createdAt;
    }
    isExpired() {
        return new Date() > this.expiresAt;
    }
    isUsed() {
        return this.usedAt !== null;
    }
    markAsUsed() {
        this.usedAt = new Date();
    }
}
exports.PasswordResetToken = PasswordResetToken;
//# sourceMappingURL=PasswordResetToken.js.map