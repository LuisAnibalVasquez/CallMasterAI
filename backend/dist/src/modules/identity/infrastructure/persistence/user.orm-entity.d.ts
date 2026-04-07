export declare class UserOrmEntity {
    id: string;
    email: string;
    passwordHash: string;
    roleId: string;
    role: any;
    tenantId: string | null;
    mustChangePassword: boolean;
    passwordLastChangedAt: Date;
    isActive: boolean;
    createdAt: Date;
    lastLoginAt: Date;
}
