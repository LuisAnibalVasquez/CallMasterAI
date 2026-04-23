import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampaignsController } from './infrastructure/http/campaigns.controller';
import { TenantContextModule } from '../../core/tenant-context/tenant-context.module';
import { CreateCampaignUseCase } from './application/use-cases/create-campaign.use-case';
import { UploadContactsCsvUseCase } from './application/use-cases/upload-contacts-csv.use-case';
import { UploadCampaignScriptUseCase } from './application/use-cases/upload-campaign-script.use-case';
import { CampaignOrmEntity } from './infrastructure/persistence/campaign.orm-entity';
import { ContactOrmEntity } from './infrastructure/persistence/contact.orm-entity';
import { CampaignFileOrmEntity } from './infrastructure/persistence/campaign-file.orm-entity';
import { CampaignRepositoryImpl } from './infrastructure/persistence/campaign.repository.impl';
import { ContactRepositoryImpl } from './infrastructure/persistence/contact.repository.impl';
import { CampaignFileRepositoryImpl } from './infrastructure/persistence/campaign-file.repository.impl';
import { LocalFileSystemStorageAdapter } from './infrastructure/storage/local-file-system.storage.adapter';
import {
  CAMPAIGN_REPOSITORY,
  CONTACT_REPOSITORY,
  CAMPAIGN_FILE_REPOSITORY,
  FILE_STORAGE_PROVIDER,
  API_KEY_VALIDATION_PORT,
} from './application/constants/injection-tokens';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CampaignOrmEntity,
      ContactOrmEntity,
      CampaignFileOrmEntity,
    ]),
    TenantContextModule,
  ],
  controllers: [CampaignsController],
  providers: [
    CreateCampaignUseCase,
    UploadContactsCsvUseCase,
    UploadCampaignScriptUseCase,
    { provide: CAMPAIGN_REPOSITORY, useClass: CampaignRepositoryImpl },
    { provide: CONTACT_REPOSITORY, useClass: ContactRepositoryImpl },
    { provide: CAMPAIGN_FILE_REPOSITORY, useClass: CampaignFileRepositoryImpl },
    { provide: FILE_STORAGE_PROVIDER, useClass: LocalFileSystemStorageAdapter },
    {
      provide: API_KEY_VALIDATION_PORT,
      useValue: { validate: () => Promise.resolve(true) },
    },
  ],
  exports: [
    CAMPAIGN_REPOSITORY,
    CONTACT_REPOSITORY,
    CAMPAIGN_FILE_REPOSITORY,
    FILE_STORAGE_PROVIDER,
    API_KEY_VALIDATION_PORT,
  ],
})
export class CampaignModule {}
