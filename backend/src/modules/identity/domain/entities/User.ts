/**
 * Entidad de dominio `User`.
 *
 * Representa el agregado principal de identidad para un usuario del sistema.
 */
export class User {
  constructor(
    /** UUID del usuario */
    public readonly id: string,
    /** Email del usuario */
    public email: string,
    /** Hash de la contraseña */
    public passwordHash: string,
    /** FK a `Role` */
    public roleId: string, // Relation to Role entity
    /** Nombre resuelto del rol (opcional) */
    public roleName: string | null = null, // Resolved role name from database
    /** Tenant asociado; null para PlatformOwner */
    public tenantId: string | null,
    /** Flag que obliga a cambio de contraseña en el primer acceso */
    public mustChangePassword: boolean,
    /** Fecha del último cambio de contraseña */
    public passwordLastChangedAt: Date,
    /** Usuario activo/inactivo */
    public isActive: boolean,
    /** Fecha de creación del registro */
    public readonly createdAt: Date,
    /** Fecha del último login */
    public lastLoginAt: Date | null,
  ) {}

  /** Devuelve true si el usuario es un PlatformOwner (sin tenant asociado). */
  public isPlatformOwner(): boolean {
    return this.tenantId === null; // Typically PlatformOwner has no associated single tenant
  }

  /** Activa el usuario. */
  public activate(): void {
    this.isActive = true;
  }

  /** Desactiva el usuario. */
  public deactivate(): void {
    this.isActive = false;
  }
}
