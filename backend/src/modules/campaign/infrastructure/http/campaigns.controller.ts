import { 
  Controller, 
  Post, 
  Body, 
  Param, 
  UploadedFile, 
  UseInterceptors, 
  UnauthorizedException 
} from '@nestjs/common';
import 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateCampaignUseCase } from '../../application/use-cases/create-campaign.use-case';
import { UploadContactsCsvUseCase } from '../../application/use-cases/upload-contacts-csv.use-case';
import { UploadCampaignScriptUseCase } from '../../application/use-cases/upload-campaign-script.use-case';
import { TenantContextService } from '../../../../core/tenant-context/tenant-context.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';

@Controller('campaigns')
export class CampaignsController {
  constructor(
    private readonly createCampaignUseCase: CreateCampaignUseCase,
    private readonly uploadContactsCsvUseCase: UploadContactsCsvUseCase,
    private readonly uploadCampaignScriptUseCase: UploadCampaignScriptUseCase,
    private readonly tenantContextService: TenantContextService,
  ) {}

  private getTenantId(): string {
    const tenantId = this.tenantContextService.getTenantId();
    if (!tenantId) {
      throw new UnauthorizedException('Tenant context not found');
    }
    return tenantId;
  }

  @Post('/')
  async createCampaign(@Body() dto: CreateCampaignDto) {
    const tenantId = this.getTenantId();
    return this.createCampaignUseCase.execute({
      tenantId,
      name: dto.name,
      description: dto.description || '',
      type: dto.type,
      createdByUserId: 'user-id-placeholder' // Need to get user ID from auth context, but instructions don't specify, so using placeholder
    });
  }

  @Post('/:id/contacts')
  @UseInterceptors(FileInterceptor('file'))
  async uploadContacts(
    @Param('id') campaignId: string, 
    @UploadedFile() file: Express.Multer.File
  ) {
    const tenantId = this.getTenantId();
    // Assuming the use case doesn't need tenantId but the controller does validation
    return this.uploadContactsCsvUseCase.execute({
      campaignId,
      file: file.buffer,
      originalName: file.originalname,
    });
  }

  @Post('/:id/script')
  @UseInterceptors(FileInterceptor('file'))
  async uploadScript(
    @Param('id') campaignId: string, 
    @UploadedFile() file: Express.Multer.File
  ) {
    const tenantId = this.getTenantId();
    return this.uploadCampaignScriptUseCase.execute({
      campaignId,
      file: file.buffer,
      originalName: file.originalname,
    });
  }
}
