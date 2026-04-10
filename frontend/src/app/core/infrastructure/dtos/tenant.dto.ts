export interface UpdatePasswordPolicyDto {
  passwordExpiryDays: 30 | 60 | 90 | 180;
}

export interface PasswordPolicyResponseDto {
  tenantId: string;
  passwordExpiryDays: number;
  updatedAt: string;
}
