import { Campaign } from './campaign.entity';
import { CampaignStatus, CampaignType } from '../enums';

describe('Campaign Entity', () => {
  it('should create a campaign in DRAFT status', () => {
    const campaign = new Campaign({
      id: '1',
      tenantId: 't1',
      name: 'Test Campaign',
      description: 'Test Description',
      type: CampaignType.COMMERCIAL,
      createdByUserId: 'user1',
    });
    expect(campaign.status).toBe(CampaignStatus.DRAFT);
  });

  it('should throw error when starting a campaign that is not READY', () => {
    const campaign = new Campaign({
      id: '1',
      tenantId: 't1',
      name: 'Test Campaign',
      description: 'Test Description',
      type: CampaignType.COMMERCIAL,
      createdByUserId: 'user1',
    });
    expect(() => campaign.start('user1')).toThrow(
      'Campaign must be in READY status to start',
    );
  });

  it('should start a campaign when it is READY', () => {
    const campaign = new Campaign({
      id: '1',
      tenantId: 't1',
      name: 'Test Campaign',
      description: 'Test Description',
      type: CampaignType.COMMERCIAL,
      createdByUserId: 'user1',
    });
    campaign.setReady();
    campaign.start('user1');
    expect(campaign.status).toBe(CampaignStatus.RUNNING);
    expect(campaign.startedAt).toBeDefined();
    expect(campaign.startedByUserId).toBe('user1');
  });

  it('should cancel a campaign', () => {
    const campaign = new Campaign({
      id: '1',
      tenantId: 't1',
      name: 'Test Campaign',
      description: 'Test Description',
      type: CampaignType.COMMERCIAL,
      createdByUserId: 'user1',
    });
    campaign.cancel('user1');
    expect(campaign.status).toBe(CampaignStatus.CANCELLED);
    expect(campaign.cancelledAt).toBeDefined();
    expect(campaign.cancelledByUserId).toBe('user1');
  });
});
