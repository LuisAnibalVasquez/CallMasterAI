export type PasswordExpiryDays = 30 | 60 | 90 | 180;
export declare const DEFAULT_PASSWORD_EXPIRY_DAYS: PasswordExpiryDays;
export declare class TenantSettings {
    readonly tenantId: string;
    passwordExpiryDays: PasswordExpiryDays;
    updatedAt: Date;
    constructor(tenantId: string, passwordExpiryDays: PasswordExpiryDays, updatedAt: Date);
    static isValidExpiryDays(days: number): days is PasswordExpiryDays;
}
