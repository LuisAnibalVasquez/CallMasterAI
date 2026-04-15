import { IUserProvisioningService } from '../../application/ports/IUserProvisioningService';
import type { IUserRepository } from '../../../identity/domain/repositories/IUserRepository';
import type { IRoleRepository } from '../../../identity/domain/repositories/IRoleRepository';
export declare class UserProvisioningAdapter implements IUserProvisioningService {
    private readonly userRepository;
    private readonly roleRepository;
    constructor(userRepository: IUserRepository, roleRepository: IRoleRepository);
    isEmailAvailable(email: string): Promise<boolean>;
    provisionInitialUser(data: {
        email: string;
        passwordHash: string;
        tenantId: string;
        roleName: string;
        mustChangePassword: true;
    }): Promise<void>;
}
