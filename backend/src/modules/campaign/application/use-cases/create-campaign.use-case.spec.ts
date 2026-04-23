import { Test, TestingModule } from '@nestjs/testing';
import { CreateCampaignUseCase } from './create-campaign.use-case';
import { ICampaignRepository } from '../../domain/repositories/campaign.repository.interface';
import { IApiKeyValidationPort } from '../ports/api-key-validation.port';
import {
  CAMPAIGN_REPOSITORY,
  API_KEY_VALIDATION_PORT,
} from '../constants/injection-tokens';
import { DomainException } from '../../domain/exceptions/domain.exception';
import { CampaignType } from '../../domain/enums/campaign-type.enum';

describe('CreateCampaignUseCase', () => {
  let useCase: CreateCampaignUseCase;
  let campaignRepository: ICampaignRepository;
  let apiKeyValidationPort: IApiKeyValidationPort;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateCampaignUseCase,
        {
          provide: CAMPAIGN_REPOSITORY,
          useValue: { save: jest.fn() },
        },
        {
          provide: API_KEY_VALIDATION_PORT,
          useValue: { hasActiveApiKey: jest.fn() },
        },
      ],
    }).compile();

    useCase = module.get<CreateCampaignUseCase>(CreateCampaignUseCase);
    campaignRepository = module.get<ICampaignRepository>(CAMPAIGN_REPOSITORY);
    apiKeyValidationPort = module.get<IApiKeyValidationPort>(
      API_KEY_VALIDATION_PORT,
    );
  });

  it('should create a campaign when API key is valid', async () => {
    jest.spyOn(apiKeyValidationPort, 'hasActiveApiKey').mockResolvedValue(true);
    const spySave = jest
      .spyOn(campaignRepository, 'save')
      .mockResolvedValue(undefined);

    const result = await useCase.execute({
      tenantId: 'tenant1',
      name: 'Campaign 1',
      description: 'Desc 1',
      type: CampaignType.COMMERCIAL,
      createdByUserId: 'user1',
    });

    expect(result).toBeDefined();
    expect(result.tenantId).toBe('tenant1');
    expect(result.name).toBe('Campaign 1');
    expect(apiKeyValidationPort.hasActiveApiKey).toHaveBeenCalledWith(
      'tenant1',
    );
    expect(spySave).toHaveBeenCalled();
  });

  it('should throw DomainException when API key is invalid', async () => {
    jest
      .spyOn(apiKeyValidationPort, 'hasActiveApiKey')
      .mockResolvedValue(false);

    await expect(
      useCase.execute({
        tenantId: 'tenant1',
        name: 'Campaign 1',
        description: 'Desc 1',
        type: CampaignType.COMMERCIAL,
        createdByUserId: 'user1',
      }),
    ).rejects.toThrow(DomainException);
  });
});
