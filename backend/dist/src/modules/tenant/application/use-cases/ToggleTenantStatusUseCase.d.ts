import { ITenantRepository } from '../../domain/interfaces/ITenantRepository';
export declare class ToggleTenantStatusUseCase {
    private readonly tenantRepository;
    constructor(tenantRepository: ITenantRepository);
    execute(tenantId: string): Promise<void>;
}
