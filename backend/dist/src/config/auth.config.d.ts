export declare const authConfig: (() => {
    jwtSecret: string;
    jwtExpiresIn: string;
    bcryptRounds: number;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    jwtSecret: string;
    jwtExpiresIn: string;
    bcryptRounds: number;
}>;
