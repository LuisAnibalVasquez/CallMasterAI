export type PasswordExpiryDays = 30 | 60 | 90 | 180;

export const DEFAULT_PASSWORD_EXPIRY_DAYS: PasswordExpiryDays = 90;

export class TenantSettings {
  constructor(
    public readonly tenantId: string,
    public passwordExpiryDays: PasswordExpiryDays,
    public updatedAt: Date,
  ) {}

  /**
   * RF-1.05: Validate that expiryDays is one of the allowed values.
   */
  static isValidExpiryDays(days: number): days is PasswordExpiryDays {
    return [30, 60, 90, 180].includes(days);
  }
}
