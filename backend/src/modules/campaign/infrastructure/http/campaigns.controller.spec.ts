import { Test, TestingModule } from '@nestjs/testing';
import { CampaignsController } from './campaigns.controller';
import { CreateCampaignUseCase } from '../../application/use-cases/create-campaign.use-case';
import { UploadContactsCsvUseCase } from '../../application/use-cases/upload-contacts-csv.use-case';
import { UploadCampaignScriptUseCase } from '../../application/use-cases/upload-campaign-script.use-case';
import { TenantContextService } from '../../../../core/tenant-context/tenant-context.service';
import { UnauthorizedException } from '@nestjs/common';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { CampaignType } from '../../domain/enums/campaign-type.enum';

describe('CampaignsController', () => {
  let controller: CampaignsController;
  let createCampaignUseCase: jest.Mocked<CreateCampaignUseCase>;
  let uploadContactsCsvUseCase: jest.Mocked<UploadContactsCsvUseCase>;
  let uploadCampaignScriptUseCase: jest.Mocked<UploadCampaignScriptUseCase>;
  let tenantContextService: jest.Mocked<TenantContextService>;

  beforeEach(async () => {
    createCampaignUseCase = { execute: jest.fn() } as any;
    uploadContactsCsvUseCase = { execute: jest.fn() } as any;
    uploadCampaignScriptUseCase = { execute: jest.fn() } as any;
    tenantContextService = { getTenantId: jest.fn() } as any;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CampaignsController],
      providers: [
        { provide: CreateCampaignUseCase, useValue: createCampaignUseCase },
        {
          provide: UploadContactsCsvUseCase,
          useValue: uploadContactsCsvUseCase,
        },
        {
          provide: UploadCampaignScriptUseCase,
          useValue: uploadCampaignScriptUseCase,
        },
        { provide: TenantContextService, useValue: tenantContextService },
      ],
    }).compile();

    controller = module.get<CampaignsController>(CampaignsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createCampaign', () => {
    it('should call CreateCampaignUseCase with correct parameters', async () => {
      const dto: CreateCampaignDto = {
        name: 'Test',
        description: 'Desc',
        type: CampaignType.COMMERCIAL,
      };
      const tenantId = 'tenant-1';
      tenantContextService.getTenantId.mockReturnValue(tenantId);

      await controller.createCampaign(dto);

      expect(createCampaignUseCase.execute).toHaveBeenCalledWith(
        expect.objectContaining({
          tenantId,
          ...dto,
        }),
      );
    });

    it('should throw UnauthorizedException if tenantId is missing', async () => {
      tenantContextService.getTenantId.mockReturnValue(null as any);

      await expect(controller.createCampaign({} as any)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('uploadContacts', () => {
    it('should call UploadContactsCsvUseCase with correct parameters', async () => {
      const campaignId = 'campaign-1';
      const file = {
        buffer: Buffer.from('test'),
        originalname: 'test.csv',
      } as any;
      const tenantId = 'tenant-1';
      tenantContextService.getTenantId.mockReturnValue(tenantId);
      uploadContactsCsvUseCase.execute.mockResolvedValue({
        total: 1,
        valid: 1,
        invalid: 0,
      });

      await controller.uploadContacts(campaignId, file);

      expect(uploadContactsCsvUseCase.execute).toHaveBeenCalledWith({
        campaignId,
        file: file.buffer,
        originalName: file.originalname,
      });
    });
  });

  describe('uploadScript', () => {
    it('should call UploadCampaignScriptUseCase with correct parameters', async () => {
      const campaignId = 'campaign-1';
      const file = {
        buffer: Buffer.from('test'),
        originalname: 'test.txt',
      } as any;
      const tenantId = 'tenant-1';
      tenantContextService.getTenantId.mockReturnValue(tenantId);
      uploadCampaignScriptUseCase.execute.mockResolvedValue(true);

      await controller.uploadScript(campaignId, file);

      expect(uploadCampaignScriptUseCase.execute).toHaveBeenCalledWith({
        campaignId,
        file: file.buffer,
        originalName: file.originalname,
      });
    });
  });
});
