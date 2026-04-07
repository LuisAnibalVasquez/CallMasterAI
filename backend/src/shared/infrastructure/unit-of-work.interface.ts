/**
 * Interfaz Unit of Work para transacciones cross-repository.
 *
 * [DIP] Los use cases que necesitan transacciones dependen de esta abstracción.
 */
export interface IUnitOfWork {
  begin(): Promise<void>;
  commit(): Promise<void>;
  rollback(): Promise<void>;
}

export const UNIT_OF_WORK = Symbol('UNIT_OF_WORK');
