/** Entidad de dominio `Role` */
export class Role {
  constructor(
    /** UUID del rol */
    public readonly id: string,
    /** Nombre del rol (unique) */
    public name: string,
    /** Descripción opcional */
    public description: string | null = null,
    /** Fecha de creación */
    public readonly createdAt: Date,
    /** Fecha de última actualización */
    public readonly updatedAt: Date,
  ) {}
}
