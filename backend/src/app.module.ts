import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ThrottlerModule } from '@nestjs/throttler';

import { databaseConfig } from './config/database.config';
import { appConfig } from './config/app.config';
import { authConfig } from './config/auth.config';
import { rateLimitConfig } from './config/rate-limit.config';
import { externalConfig } from './config/external.config';

// Bounded Context Modules
import { IdentityModule } from './modules/identity/identity.module';
import { TenantModule } from './modules/tenant/tenant.module';
import { CampaignModule } from './modules/campaign/campaign.module';
import { VoiceAgentModule } from './modules/voice-agent/voice-agent.module';
import { DialingRulesModule } from './modules/dialing-rules/dialing-rules.module';
import { ApiKeyModule } from './modules/api-key/api-key.module';
import { NotificationModule } from './modules/notification/notification.module';
import { AuditModule } from './modules/audit/audit.module';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, authConfig, rateLimitConfig, externalConfig],
    }),

    // Database
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const dbConfig = configService.get('database');
        return {
          ...dbConfig,
          autoLoadEntities: true,
        };
      },
    }),

    // Event Emitter (Domain Events)
    EventEmitterModule.forRoot(),

    // Rate Limiting
    ThrottlerModule.forRoot({
      throttlers: [{ ttl: 60000, limit: 30 }],
    }),

    // Bounded Context Modules
    IdentityModule,
    TenantModule,
    CampaignModule,
    VoiceAgentModule,
    DialingRulesModule,
    ApiKeyModule,
    NotificationModule,
    AuditModule,
  ],
})
export class AppModule {}
