export interface TenantProps {
    id: string;
    name: string;
    phone: string;
    adminEmail: string;
    isActive?: boolean;
    incurredSpend?: number;
}
export declare class Tenant {
    readonly id: string;
    name: string;
    phone: string;
    adminEmail: string;
    isActive: boolean;
    incurredSpend: number;
    constructor(props: TenantProps);
}
