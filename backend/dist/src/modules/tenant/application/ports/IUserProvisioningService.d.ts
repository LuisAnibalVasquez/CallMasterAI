export interface IUserProvisioningService {
    provisionInitialUser(data: {
        email: string;
        passwordHash: string;
        tenantId: string;
        roleName: string;
        mustChangePassword: true;
    }): Promise<void>;
}
