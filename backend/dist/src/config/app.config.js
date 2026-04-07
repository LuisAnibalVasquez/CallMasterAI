"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appConfig = void 0;
const config_1 = require("@nestjs/config");
exports.appConfig = (0, config_1.registerAs)('app', () => ({
    port: parseInt(process.env.PORT ?? '3000', 10),
    environment: process.env.NODE_ENV ?? 'development',
    corsOrigins: process.env.CORS_ORIGINS?.split(',') ?? ['http://localhost:4200'],
}));
//# sourceMappingURL=app.config.js.map