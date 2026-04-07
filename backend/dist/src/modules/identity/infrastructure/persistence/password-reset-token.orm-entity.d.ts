export declare class PasswordResetTokenOrmEntity {
    id: string;
    userId: string;
    user: any;
    tokenHash: string;
    expiresAt: Date;
    usedAt: Date;
    createdAt: Date;
}
