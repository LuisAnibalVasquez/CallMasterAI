export enum CampaignStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  PAUSED = 'PAUSED',
  COMPLETED = 'COMPLETED',
}

export enum CampaignType {
  VOICE = 'VOICE',
  SMS = 'SMS',
}

export interface Campaign {
  id: string;
  name: string;
  description: string;
  type: CampaignType;
  status: CampaignStatus;
  createdAt: string;
}

export interface CreateCampaignDto {
  name: string;
  description: string;
  type: CampaignType;
}
