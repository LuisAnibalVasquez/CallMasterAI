import { CampaignFileMapper } from './campaign-file.mapper';
import { CampaignFile } from '../../../domain/entities/campaign-file.entity';
import { CampaignFileOrmEntity } from '../campaign-file.orm-entity';
import { CampaignFileType } from '../../../domain/enums';

describe('CampaignFileMapper', () => {
  it('should map domain to persistence', () => {
    const domain = new CampaignFile({
      id: '1',
      campaignId: 'c1',
      type: CampaignFileType.SCRIPT,
      path: '/path/to/file',
      originalName: 'file.txt',
    });

    const orm = CampaignFileMapper.toPersistence(domain);

    expect(orm.id).toBe(domain.id);
    expect(orm.path).toBe(domain.path);
  });

  it('should map persistence to domain', () => {
    const orm = new CampaignFileOrmEntity();
    orm.id = '1';
    orm.campaignId = 'c1';
    orm.type = CampaignFileType.SCRIPT;
    orm.path = '/path/to/file';
    orm.originalName = 'file.txt';
    orm.uploadedAt = new Date();

    const domain = CampaignFileMapper.toDomain(orm);

    expect(domain.id).toBe(orm.id);
    expect(domain.path).toBe(orm.path);
  });
});
