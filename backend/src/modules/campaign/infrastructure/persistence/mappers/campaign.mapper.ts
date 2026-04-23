import { Campaign } from '../../../domain/entities/campaign.entity';
import { CampaignOrmEntity } from '../campaign.orm-entity';

export class CampaignMapper {
  static toDomain(ormEntity: CampaignOrmEntity): Campaign {
    return Campaign.fromPersistence({
      id: ormEntity.id,
      tenantId: ormEntity.tenantId,
      name: ormEntity.name,
      description: ormEntity.description,
      type: ormEntity.type,
      status: ormEntity.status,
      createdAt: ormEntity.createdAt,
      createdByUserId: ormEntity.createdByUserId,
      startedAt: ormEntity.startedAt,
      startedByUserId: ormEntity.startedByUserId,
      endedAt: ormEntity.endedAt,
      cancelledAt: ormEntity.cancelledAt,
      cancelledByUserId: ormEntity.cancelledByUserId,
    });
  }

  static toPersistence(domainEntity: Campaign): CampaignOrmEntity {
    const ormEntity = new CampaignOrmEntity();
    ormEntity.id = domainEntity.id;
    ormEntity.tenantId = domainEntity.tenantId;
    ormEntity.name = domainEntity.name;
    ormEntity.description = domainEntity.description;
    ormEntity.type = domainEntity.type;
    ormEntity.status = domainEntity.status;
    ormEntity.createdAt = domainEntity.createdAt;
    ormEntity.createdByUserId = domainEntity.createdByUserId;
    ormEntity.startedAt = domainEntity.startedAt;
    ormEntity.startedByUserId = domainEntity.startedByUserId;
    ormEntity.endedAt = domainEntity.endedAt;
    ormEntity.cancelledAt = domainEntity.cancelledAt;
    ormEntity.cancelledByUserId = domainEntity.cancelledByUserId;
    return ormEntity;
  }
}
