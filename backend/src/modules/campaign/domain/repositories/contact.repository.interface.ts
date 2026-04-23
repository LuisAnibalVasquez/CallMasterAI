import { Contact } from '../entities';

export interface IContactRepository {
  save(contact: Contact): Promise<void>;
  findByCampaignId(campaignId: string): Promise<Contact[]>;
}
