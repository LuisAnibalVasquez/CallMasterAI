export declare const rateLimitConfig: (() => {
    production: {
        requestsPerMinute: number;
        burstLimit: number;
        burstWindowSeconds: number;
        maxConcurrent: number;
    };
    sandbox: {
        requestsPerMinute: number;
        burstLimit: number;
        burstWindowSeconds: number;
        maxConcurrent: number;
    };
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    production: {
        requestsPerMinute: number;
        burstLimit: number;
        burstWindowSeconds: number;
        maxConcurrent: number;
    };
    sandbox: {
        requestsPerMinute: number;
        burstLimit: number;
        burstWindowSeconds: number;
        maxConcurrent: number;
    };
}>;
