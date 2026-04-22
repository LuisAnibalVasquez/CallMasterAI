import { Test, TestingModule } from '@nestjs/testing';
import { UploadCampaignScriptUseCase } from './upload-campaign-script.use-case';
import { ICampaignRepository } from '../../domain/repositories/campaign.repository.interface';
import { ICampaignFileRepository } from '../../domain/repositories/campaign-file.repository.interface';
import { IFileStorageProvider } from '../ports/file-storage.provider.interface';
import { CAMPAIGN_REPOSITORY, FILE_STORAGE_PROVIDER, CAMPAIGN_FILE_REPOSITORY } from '../constants/injection-tokens';
import { Campaign } from '../../domain/entities/campaign.entity';
import { CampaignType } from '../../domain/enums/campaign-type.enum';

describe('UploadCampaignScriptUseCase', () => {
  let useCase: UploadCampaignScriptUseCase;
  let campaignRepository: ICampaignRepository;
  let campaignFileRepository: ICampaignFileRepository;
  let fileStorageProvider: IFileStorageProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UploadCampaignScriptUseCase,
        { provide: CAMPAIGN_REPOSITORY, useValue: { findById: jest.fn() } },
        { provide: CAMPAIGN_FILE_REPOSITORY, useValue: { save: jest.fn() } },
        { provide: FILE_STORAGE_PROVIDER, useValue: { uploadFile: jest.fn() } },
      ],
    }).compile();

    useCase = module.get<UploadCampaignScriptUseCase>(UploadCampaignScriptUseCase);
    campaignRepository = module.get<ICampaignRepository>(CAMPAIGN_REPOSITORY);
    campaignFileRepository = module.get<ICampaignFileRepository>(CAMPAIGN_FILE_REPOSITORY);
    fileStorageProvider = module.get<IFileStorageProvider>(FILE_STORAGE_PROVIDER);
  });

  it('should upload script and save reference', async () => {
    const campaign = new Campaign({
      id: 'c1', tenantId: 't1', name: 'Camp', description: 'Desc', 
      type: CampaignType.COMMERCIAL, createdByUserId: 'u1'
    });
    jest.spyOn(campaignRepository, 'findById').mockResolvedValue(campaign);
    jest.spyOn(fileStorageProvider, 'uploadFile').mockResolvedValue('path/to/script');
    jest.spyOn(campaignFileRepository, 'save').mockResolvedValue(undefined);

    const result = await useCase.execute({
      campaignId: 'c1',
      file: Buffer.from('script content'),
      originalName: 'script.js'
    });

    expect(result).toBe(true);
    expect(fileStorageProvider.uploadFile).toHaveBeenCalled();
    expect(campaignFileRepository.save).toHaveBeenCalled();
  });
});
