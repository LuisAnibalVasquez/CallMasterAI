export declare class PasswordResetToken {
    readonly id: string;
    readonly userId: string;
    tokenHash: string;
    expiresAt: Date;
    usedAt: Date | null;
    readonly createdAt: Date;
    constructor(id: string, userId: string, tokenHash: string, expiresAt: Date, usedAt: Date | null, createdAt: Date);
    isExpired(): boolean;
    isUsed(): boolean;
    markAsUsed(): void;
}
