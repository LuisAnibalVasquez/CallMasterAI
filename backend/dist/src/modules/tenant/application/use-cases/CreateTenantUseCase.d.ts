import { ITenantRepository } from '../../domain/interfaces/ITenantRepository';
import { IUserProvisioningService } from '../ports/IUserProvisioningService';
import { IPasswordHasher } from '../../../identity/application/ports/IPasswordHasher';
export interface CreateTenantRequest {
    name: string;
    phone: string;
    adminEmail: string;
}
export interface CreateTenantResponse {
    id: string;
    name: string;
    adminEmail: string;
    temporaryPassword: string;
}
export declare class CreateTenantUseCase {
    private readonly tenantRepository;
    private readonly userProvisioningService;
    private readonly passwordHasher;
    private readonly STATIC_PASSWORD;
    constructor(tenantRepository: ITenantRepository, userProvisioningService: IUserProvisioningService, passwordHasher: IPasswordHasher);
    execute(request: CreateTenantRequest): Promise<CreateTenantResponse>;
}
