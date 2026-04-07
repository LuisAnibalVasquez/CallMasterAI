export class PasswordResetToken {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public tokenHash: string,
    public expiresAt: Date,
    public usedAt: Date | null,
    public readonly createdAt: Date,
  ) {}

  public isExpired(): boolean {
    return new Date() > this.expiresAt;
  }

  public isUsed(): boolean {
    return this.usedAt !== null;
  }

  public markAsUsed(): void {
    this.usedAt = new Date();
  }
}
