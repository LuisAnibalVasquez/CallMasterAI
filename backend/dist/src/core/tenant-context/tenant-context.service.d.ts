export declare class TenantContextService {
    private readonly als;
    getTenantId(): string | undefined;
    run<R>(tenantId: string, callback: () => R): R;
}
