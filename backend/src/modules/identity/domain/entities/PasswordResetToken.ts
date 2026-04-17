/** Entidad que representa un token de restablecimiento de contraseña. */
export class PasswordResetToken {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public tokenHash: string,
    public expiresAt: Date,
    public usedAt: Date | null,
    public readonly createdAt: Date,
  ) {}

  /** Indica si el token ya expiró. */
  public isExpired(): boolean {
    return new Date() > this.expiresAt;
  }

  /** Indica si el token ya fue usado. */
  public isUsed(): boolean {
    return this.usedAt !== null;
  }

  /** Marca el token como usado estableciendo `usedAt`. */
  public markAsUsed(): void {
    this.usedAt = new Date();
  }
}
