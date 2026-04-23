import { CampaignFile } from '../../../domain/entities/campaign-file.entity';
import { CampaignFileOrmEntity } from '../campaign-file.orm-entity';

export class CampaignFileMapper {
  static toDomain(ormEntity: CampaignFileOrmEntity): CampaignFile {
    return CampaignFile.fromPersistence({
      id: ormEntity.id,
      campaignId: ormEntity.campaignId,
      type: ormEntity.type,
      path: ormEntity.path,
      originalName: ormEntity.originalName,
      uploadedAt: ormEntity.uploadedAt,
    });
  }

  static toPersistence(domainEntity: CampaignFile): CampaignFileOrmEntity {
    const ormEntity = new CampaignFileOrmEntity();
    ormEntity.id = domainEntity.id;
    ormEntity.campaignId = domainEntity.campaignId;
    ormEntity.type = domainEntity.type;
    ormEntity.path = domainEntity.path;
    ormEntity.originalName = domainEntity.originalName;
    ormEntity.uploadedAt = domainEntity.uploadedAt;
    return ormEntity;
  }
}
