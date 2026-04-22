import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ICampaignFileRepository } from '../../../domain/repositories/campaign-file.repository.interface';
import { CampaignFile } from '../../../domain/entities/campaign-file.entity';
import { CampaignFileOrmEntity } from './campaign-file.orm-entity';
import { CampaignFileMapper } from './mappers/campaign-file.mapper';

@Injectable()
export class CampaignFileRepositoryImpl implements ICampaignFileRepository {
  constructor(
    @InjectRepository(CampaignFileOrmEntity)
    private readonly repository: Repository<CampaignFileOrmEntity>,
  ) {}

  async save(campaignFile: CampaignFile): Promise<void> {
    const ormEntity = CampaignFileMapper.toPersistence(campaignFile);
    await this.repository.save(ormEntity);
  }
}
