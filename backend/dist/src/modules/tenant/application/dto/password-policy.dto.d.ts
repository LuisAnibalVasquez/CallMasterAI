export declare class UpdatePasswordPolicyDto {
    passwordExpiryDays: 30 | 60 | 90 | 180;
}
export declare class PasswordPolicyResponseDto {
    tenantId: string;
    passwordExpiryDays: number;
    updatedAt: Date;
}
