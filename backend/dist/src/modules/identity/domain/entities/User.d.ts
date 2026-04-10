export declare class User {
    readonly id: string;
    email: string;
    passwordHash: string;
    roleId: string;
    roleName: string | null;
    tenantId: string | null;
    mustChangePassword: boolean;
    passwordLastChangedAt: Date;
    isActive: boolean;
    readonly createdAt: Date;
    lastLoginAt: Date | null;
    constructor(id: string, email: string, passwordHash: string, roleId: string, roleName: string | null | undefined, tenantId: string | null, mustChangePassword: boolean, passwordLastChangedAt: Date, isActive: boolean, createdAt: Date, lastLoginAt: Date | null);
    isPlatformOwner(): boolean;
    activate(): void;
    deactivate(): void;
}
