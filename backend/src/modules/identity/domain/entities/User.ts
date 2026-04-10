export class User {
  constructor(
    public readonly id: string,
    public email: string,
    public passwordHash: string,
    public roleId: string, // Relation to Role entity
    public roleName: string | null = null, // Resolved role name from database
    public tenantId: string | null,
    public mustChangePassword: boolean,
    public passwordLastChangedAt: Date,
    public isActive: boolean,
    public readonly createdAt: Date,
    public lastLoginAt: Date | null,
  ) {}

  public isPlatformOwner(): boolean {
    return this.tenantId === null; // Typically PlatformOwner has no associated single tenant
  }

  public activate(): void {
    this.isActive = true;
  }

  public deactivate(): void {
    this.isActive = false;
  }
}
