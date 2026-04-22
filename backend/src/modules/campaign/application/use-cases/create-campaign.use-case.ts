import { Injectable, Inject } from '@nestjs/common';
import { ICampaignRepository } from '../../domain/repositories/campaign.repository.interface';
import { IApiKeyValidationPort } from '../ports/api-key-validation.port';
import { CAMPAIGN_REPOSITORY, API_KEY_VALIDATION_PORT } from '../constants/injection-tokens';
import { DomainException } from '../../domain/exceptions/domain.exception';
import { Campaign, CampaignProps } from '../../domain/entities/campaign.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CreateCampaignUseCase {
  constructor(
    @Inject(CAMPAIGN_REPOSITORY)
    private readonly campaignRepository: ICampaignRepository,
    @Inject(API_KEY_VALIDATION_PORT)
    private readonly apiKeyValidationPort: IApiKeyValidationPort,
  ) {}

  async execute(
    data: Omit<CampaignProps, 'id'>,
  ): Promise<Campaign> {
    const isApiKeyValid = await this.apiKeyValidationPort.hasActiveApiKey(data.tenantId);
    if (!isApiKeyValid) {
      throw new DomainException('Invalid or inactive API key');
    }

    const campaign = new Campaign({
      id: uuidv4(),
      ...data,
    });

    await this.campaignRepository.save(campaign);

    return campaign;
  }
}
