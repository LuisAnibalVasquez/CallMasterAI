import { Role } from '../entities/Role';

export interface IRoleRepository {
  findByName(name: string): Promise<Role | null>;
  findById(id: string): Promise<Role | null>;
  save(role: Role): Promise<void>;
}
