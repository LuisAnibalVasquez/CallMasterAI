import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ICampaignRepository } from '../../domain/repositories/campaign.repository.interface';
import { Campaign } from '../../domain/entities/campaign.entity';
import { CampaignOrmEntity } from './campaign.orm-entity';
import { CampaignMapper } from './mappers/campaign.mapper';

@Injectable()
export class CampaignRepositoryImpl implements ICampaignRepository {
  constructor(
    @InjectRepository(CampaignOrmEntity)
    private readonly repository: Repository<CampaignOrmEntity>,
  ) {}

  async findById(id: string): Promise<Campaign | null> {
    const ormEntity = await this.repository.findOne({ where: { id } });
    return ormEntity ? CampaignMapper.toDomain(ormEntity) : null;
  }

  async save(campaign: Campaign): Promise<void> {
    const ormEntity = CampaignMapper.toPersistence(campaign);
    await this.repository.save(ormEntity);
  }
}
