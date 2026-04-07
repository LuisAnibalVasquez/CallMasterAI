"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimitConfig = void 0;
const config_1 = require("@nestjs/config");
exports.rateLimitConfig = (0, config_1.registerAs)('rateLimit', () => ({
    production: {
        requestsPerMinute: 30,
        burstLimit: 60,
        burstWindowSeconds: 10,
        maxConcurrent: 10,
    },
    sandbox: {
        requestsPerMinute: 15,
        burstLimit: 30,
        burstWindowSeconds: 10,
        maxConcurrent: 5,
    },
}));
//# sourceMappingURL=rate-limit.config.js.map