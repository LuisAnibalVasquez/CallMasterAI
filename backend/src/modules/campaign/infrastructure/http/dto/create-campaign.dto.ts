import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { CampaignType } from '../../../domain/enums/campaign-type.enum';

export class CreateCampaignDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(CampaignType)
  @IsNotEmpty()
  type: CampaignType;
}
