import { registerAs } from '@nestjs/config';

/**
 * Rate limit config alineado a RF-6.11 (producción) y RF-6.12 (sandbox).
 *
 * Producción: 30 req/min por key, burst 60 en 10s, concurrencia 10.
 * Sandbox:    15 req/min por key, burst 30 en 10s, concurrencia 5.
 */
export const rateLimitConfig = registerAs('rateLimit', () => ({
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
