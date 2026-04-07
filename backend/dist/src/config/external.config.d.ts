export declare const externalConfig: (() => {
    twilio: {
        accountSid: string;
        authToken: string;
        phoneNumber: string;
    };
    openai: {
        apiKey: string;
        model: string;
    };
    smtp: {
        host: string;
        port: number;
        user: string;
        password: string;
        from: string;
    };
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    twilio: {
        accountSid: string;
        authToken: string;
        phoneNumber: string;
    };
    openai: {
        apiKey: string;
        model: string;
    };
    smtp: {
        host: string;
        port: number;
        user: string;
        password: string;
        from: string;
    };
}>;
