"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const event_emitter_1 = require("@nestjs/event-emitter");
const throttler_1 = require("@nestjs/throttler");
const database_config_1 = require("./config/database.config");
const app_config_1 = require("./config/app.config");
const auth_config_1 = require("./config/auth.config");
const rate_limit_config_1 = require("./config/rate-limit.config");
const external_config_1 = require("./config/external.config");
const identity_module_1 = require("./modules/identity/identity.module");
const tenant_module_1 = require("./modules/tenant/tenant.module");
const campaign_module_1 = require("./modules/campaign/campaign.module");
const voice_agent_module_1 = require("./modules/voice-agent/voice-agent.module");
const dialing_rules_module_1 = require("./modules/dialing-rules/dialing-rules.module");
const api_key_module_1 = require("./modules/api-key/api-key.module");
const notification_module_1 = require("./modules/notification/notification.module");
const audit_module_1 = require("./modules/audit/audit.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [app_config_1.appConfig, database_config_1.databaseConfig, auth_config_1.authConfig, rate_limit_config_1.rateLimitConfig, external_config_1.externalConfig],
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (configService) => {
                    const dbConfig = configService.get('database');
                    return {
                        ...dbConfig,
                        autoLoadEntities: true,
                    };
                },
            }),
            event_emitter_1.EventEmitterModule.forRoot(),
            throttler_1.ThrottlerModule.forRoot({
                throttlers: [{ ttl: 60000, limit: 30 }],
            }),
            identity_module_1.IdentityModule,
            tenant_module_1.TenantModule,
            campaign_module_1.CampaignModule,
            voice_agent_module_1.VoiceAgentModule,
            dialing_rules_module_1.DialingRulesModule,
            api_key_module_1.ApiKeyModule,
            notification_module_1.NotificationModule,
            audit_module_1.AuditModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map