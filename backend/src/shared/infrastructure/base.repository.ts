/**
 * Interfaz base de repositorio genérico.
 * Cada bounded context extiende con métodos específicos.
 *
 * [ISP] Solo define operaciones CRUD básicas.
 */
export interface IRepository<T> {
  findById(id: string): Promise<T | null>;
  save(entity: T): Promise<T>;
  delete(id: string): Promise<void>;
}
