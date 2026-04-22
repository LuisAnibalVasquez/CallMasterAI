import { CampaignFile } from '../entities';

export interface ICampaignFileRepository {
  save(campaignFile: CampaignFile): Promise<void>;
}
