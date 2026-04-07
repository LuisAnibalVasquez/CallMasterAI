/**
 * Clase base para todas las entidades del dominio.
 * Proporciona identidad (Id) y timestamps de auditoría.
 */
export abstract class BaseEntity {
  readonly id: string;
  readonly createdAt: Date;

  protected constructor(id: string, createdAt?: Date) {
    this.id = id;
    this.createdAt = createdAt ?? new Date();
  }
}
