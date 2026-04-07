"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.externalConfig = void 0;
const config_1 = require("@nestjs/config");
exports.externalConfig = (0, config_1.registerAs)('external', () => ({
    twilio: {
        accountSid: process.env.TWILIO_ACCOUNT_SID ?? '',
        authToken: process.env.TWILIO_AUTH_TOKEN ?? '',
        phoneNumber: process.env.TWILIO_PHONE_NUMBER ?? '',
    },
    openai: {
        apiKey: process.env.OPENAI_API_KEY ?? '',
        model: process.env.OPENAI_MODEL ?? 'gpt-4',
    },
    smtp: {
        host: process.env.SMTP_HOST ?? 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT ?? '587', 10),
        user: process.env.SMTP_USER ?? '',
        password: process.env.SMTP_PASSWORD ?? '',
        from: process.env.SMTP_FROM ?? 'noreply@callmasterai.com',
    },
}));
//# sourceMappingURL=external.config.js.map