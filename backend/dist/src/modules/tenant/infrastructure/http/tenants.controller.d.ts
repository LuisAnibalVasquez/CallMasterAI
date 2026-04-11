import { CreateTenantUseCase } from '../../application/use-cases/CreateTenantUseCase';
import { GetTenantsUseCase } from '../../application/use-cases/GetTenantsUseCase';
import { ToggleTenantStatusUseCase } from '../../application/use-cases/ToggleTenantStatusUseCase';
import { CreateTenantDto } from './dto/create-tenant.dto';
export declare class TenantsController {
    private readonly createTenantUseCase;
    private readonly getTenantsUseCase;
    private readonly toggleTenantStatusUseCase;
    constructor(createTenantUseCase: CreateTenantUseCase, getTenantsUseCase: GetTenantsUseCase, toggleTenantStatusUseCase: ToggleTenantStatusUseCase);
    createTenant(dto: CreateTenantDto): Promise<import("../../application/use-cases/CreateTenantUseCase").CreateTenantResponse>;
    getTenants(): Promise<import("../../domain/entities/Tenant").Tenant[]>;
    toggleStatus(id: string): Promise<void>;
}
