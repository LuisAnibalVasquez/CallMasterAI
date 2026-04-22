import { CampaignFile } from './campaign-file.entity';
import { CampaignFileType } from '../enums';

describe('CampaignFile Entity', () => {
  it('should create a campaign file', () => {
    const file = new CampaignFile({
      id: '1',
      campaignId: 'c1',
      type: CampaignFileType.CSV,
      path: '/tmp/test.csv',
      originalName: 'test.csv',
    });
    expect(file.originalName).toBe('test.csv');
    expect(file.uploadedAt).toBeDefined();
  });
});
