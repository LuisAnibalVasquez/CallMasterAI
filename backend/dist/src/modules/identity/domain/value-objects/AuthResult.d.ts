export declare class AuthResult {
    success: boolean;
    token: string | null;
    userId: string | null;
    roleId: string | null;
    roleName: string | null;
    mustChangePassword: boolean;
    errorMessage: string | null;
    constructor(success: boolean, token?: string | null, userId?: string | null, roleId?: string | null, roleName?: string | null, mustChangePassword?: boolean, errorMessage?: string | null);
}
export interface JwtPayload {
    sub: string;
    email: string;
    roleId: string;
    roleName: string;
    tenantId: string | null;
    mustChangePassword: boolean;
}
