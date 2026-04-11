import { Repository } from 'typeorm';
import { ITenantRepository } from '../../domain/interfaces/ITenantRepository';
import { Tenant } from '../../domain/entities/Tenant';
import { TenantOrmEntity } from './orm-entities/Tenant.orm-entity';
export declare class TenantRepositoryImpl implements ITenantRepository {
    private readonly repository;
    constructor(repository: Repository<TenantOrmEntity>);
    save(tenant: Tenant): Promise<void>;
    findAll(): Promise<Tenant[]>;
    findById(id: string): Promise<Tenant | null>;
    update(tenant: Tenant): Promise<void>;
}
