import { Test, TestingModule } from '@nestjs/testing';
import { UploadContactsCsvUseCase } from './upload-contacts-csv.use-case';
import { ICampaignRepository } from '../../domain/repositories/campaign.repository.interface';
import { IContactRepository } from '../../domain/repositories/contact.repository.interface';
import { IFileStorageProvider } from '../ports/file-storage.provider.interface';
import {
  CAMPAIGN_REPOSITORY,
  CONTACT_REPOSITORY,
  FILE_STORAGE_PROVIDER,
} from '../constants/injection-tokens';
import { Campaign } from '../../domain/entities/campaign.entity';
import { CampaignType } from '../../domain/enums/campaign-type.enum';
import { DomainException } from '../../domain/exceptions/domain.exception';

describe('UploadContactsCsvUseCase', () => {
  let useCase: UploadContactsCsvUseCase;
  let campaignRepository: ICampaignRepository;
  let contactRepository: IContactRepository;
  let fileStorageProvider: IFileStorageProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UploadContactsCsvUseCase,
        { provide: CAMPAIGN_REPOSITORY, useValue: { findById: jest.fn() } },
        { provide: CONTACT_REPOSITORY, useValue: { save: jest.fn() } },
        { provide: FILE_STORAGE_PROVIDER, useValue: { uploadFile: jest.fn() } },
      ],
    }).compile();

    useCase = module.get<UploadContactsCsvUseCase>(UploadContactsCsvUseCase);
    campaignRepository = module.get<ICampaignRepository>(CAMPAIGN_REPOSITORY);
    contactRepository = module.get<IContactRepository>(CONTACT_REPOSITORY);
    fileStorageProvider = module.get<IFileStorageProvider>(
      FILE_STORAGE_PROVIDER,
    );
  });

  it('should upload contacts when campaign is in DRAFT status', async () => {
    const campaign = new Campaign({
      id: 'c1',
      tenantId: 't1',
      name: 'Camp',
      description: 'Desc',
      type: CampaignType.COMMERCIAL,
      createdByUserId: 'u1',
    });
    jest.spyOn(campaignRepository, 'findById').mockResolvedValue(campaign);
    jest
      .spyOn(fileStorageProvider, 'uploadFile')
      .mockResolvedValue('path/to/file');
    jest.spyOn(contactRepository, 'save').mockResolvedValue(undefined);

    const csvContent = 'name,phone\nJohn,123456\nJane,654321';
    const result = await useCase.execute({
      campaignId: 'c1',
      file: Buffer.from(csvContent),
      originalName: 'contacts.csv',
    });

    expect(result).toEqual({ total: 2, valid: 2, invalid: 0 });
    expect(fileStorageProvider.uploadFile).toHaveBeenCalled();
    expect(contactRepository.save).toHaveBeenCalledTimes(2);
  });

  it('should throw DomainException when campaign not in DRAFT', async () => {
    const campaign = new Campaign({
      id: 'c1',
      tenantId: 't1',
      name: 'Camp',
      description: 'Desc',
      type: CampaignType.COMMERCIAL,
      createdByUserId: 'u1',
    });
    campaign.setReady();
    campaign.start('u1'); // Now RUNNING

    jest.spyOn(campaignRepository, 'findById').mockResolvedValue(campaign);

    await expect(
      useCase.execute({
        campaignId: 'c1',
        file: Buffer.from('name,phone'),
        originalName: 'contacts.csv',
      }),
    ).rejects.toThrow(DomainException);
  });
});
