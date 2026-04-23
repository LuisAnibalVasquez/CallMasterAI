import { Campaign } from '../entities';

export interface ICampaignRepository {
  findById(id: string): Promise<Campaign | null>;
  save(campaign: Campaign): Promise<void>;
}
