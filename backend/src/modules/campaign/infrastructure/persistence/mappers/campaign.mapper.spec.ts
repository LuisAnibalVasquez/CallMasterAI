import { CampaignMapper } from './campaign.mapper';
import { Campaign } from '../../../domain/entities/campaign.entity';
import { CampaignOrmEntity } from '../campaign.orm-entity';
import { CampaignStatus, CampaignType } from '../../../domain/enums';

describe('CampaignMapper', () => {
  it('should map domain to persistence', () => {
    const domain = new Campaign({
      id: '1',
      tenantId: 't1',
      name: 'Campaign 1',
      description: 'Desc',
      type: CampaignType.COMMERCIAL,
      createdByUserId: 'user1',
    });
    
    const orm = CampaignMapper.toPersistence(domain);
    
    expect(orm.id).toBe(domain.id);
    expect(orm.name).toBe(domain.name);
    expect(orm.status).toBe(CampaignStatus.DRAFT);
  });

  it('should map persistence to domain', () => {
    const orm = new CampaignOrmEntity();
    orm.id = '1';
    orm.tenantId = 't1';
    orm.name = 'Campaign 1';
    orm.description = 'Desc';
    orm.type = CampaignType.COMMERCIAL;
    orm.status = CampaignStatus.DRAFT;
    orm.createdAt = new Date();
    orm.createdByUserId = 'user1';
    
    const domain = CampaignMapper.toDomain(orm);
    
    expect(domain.id).toBe(orm.id);
    expect(domain.name).toBe(orm.name);
    expect(domain.status).toBe(orm.status);
  });
});
