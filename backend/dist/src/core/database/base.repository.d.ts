import { Repository, DeepPartial, FindManyOptions, FindOneOptions, SaveOptions } from 'typeorm';
import { TenantContextService } from '../tenant-context/tenant-context.service';
export declare class BaseRepository<T extends {
    tenant_id?: string;
}> extends Repository<T> {
    protected readonly tenantContextService: TenantContextService;
    constructor(target: any, manager: any, queryRunner: any, tenantContextService: TenantContextService);
    private get tenantId();
    private appendTenantIdToWhere;
    find(options?: FindManyOptions<T>): Promise<T[]>;
    findOne(options: FindOneOptions<T>): Promise<T | null>;
    save<E extends DeepPartial<T>>(entity: E, options?: SaveOptions): Promise<E & T>;
    save<E extends DeepPartial<T>>(entities: E[], options?: SaveOptions): Promise<(E & T)[]>;
}
