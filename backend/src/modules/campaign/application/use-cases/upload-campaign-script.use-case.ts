import { Injectable, Inject } from '@nestjs/common';
import type { ICampaignRepository } from '../../domain/repositories/campaign.repository.interface';
import type { ICampaignFileRepository } from '../../domain/repositories/campaign-file.repository.interface';
import type { IFileStorageProvider } from '../ports/file-storage.provider.interface';
import {
  CAMPAIGN_REPOSITORY,
  FILE_STORAGE_PROVIDER,
  CAMPAIGN_FILE_REPOSITORY,
} from '../constants/injection-tokens';
import { DomainException } from '../../domain/exceptions/domain.exception';
import { CampaignStatus } from '../../domain/enums/campaign-status.enum';
import { CampaignFileType } from '../../domain/enums/campaign-file-type.enum';
import { CampaignFile } from '../../domain/entities/campaign-file.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UploadCampaignScriptUseCase {
  constructor(
    @Inject(CAMPAIGN_REPOSITORY)
    private readonly campaignRepository: ICampaignRepository,
    @Inject(CAMPAIGN_FILE_REPOSITORY)
    private readonly campaignFileRepository: ICampaignFileRepository,
    @Inject(FILE_STORAGE_PROVIDER)
    private readonly fileStorageProvider: IFileStorageProvider,
  ) {}

  async execute(data: {
    campaignId: string;
    file: Buffer;
    originalName: string;
  }): Promise<boolean> {
    const campaign = await this.campaignRepository.findById(data.campaignId);
    if (!campaign) {
      throw new DomainException('Campaign not found');
    }

    if (campaign.status !== CampaignStatus.DRAFT) {
      throw new DomainException('Campaign must be in DRAFT status');
    }

    const path = await this.fileStorageProvider.uploadFile(
      campaign.tenantId,
      campaign.id,
      data.file,
      data.originalName,
    );

    const campaignFile = new CampaignFile({
      id: uuidv4(),
      campaignId: campaign.id,
      type: CampaignFileType.SCRIPT,
      path,
      originalName: data.originalName,
    });

    await this.campaignFileRepository.save(campaignFile);

    return true;
  }
}
