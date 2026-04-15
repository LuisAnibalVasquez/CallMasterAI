import type { ITenantRepository } from '../../domain/interfaces/ITenantRepository';
import { Tenant } from '../../domain/entities/Tenant';
export declare class GetTenantsUseCase {
    private readonly tenantRepository;
    constructor(tenantRepository: ITenantRepository);
    execute(): Promise<Tenant[]>;
}
