import { Repository } from 'typeorm';
import { IRoleRepository } from '../../domain/repositories/IRoleRepository';
import { Role } from '../../domain/entities/Role';
import { RoleOrmEntity } from './role.orm-entity';
export declare class RoleRepositoryImpl implements IRoleRepository {
    private readonly repository;
    constructor(repository: Repository<RoleOrmEntity>);
    findByName(name: string): Promise<Role | null>;
    findById(id: string): Promise<Role | null>;
    save(role: Role): Promise<void>;
}
