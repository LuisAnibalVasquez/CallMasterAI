export interface IUserProvisioningService {
    isEmailAvailable(email: string): Promise<boolean>;
    provisionInitialUser(data: {
        email: string;
        passwordHash: string;
        tenantId: string;
        roleName: string;
        mustChangePassword: true;
    }): Promise<void>;
}
