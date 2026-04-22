export enum CampaignStatus {
  DRAFT = 'DRAFT',
  READY = 'READY',
  RUNNING = 'RUNNING',
  PAUSED = 'PAUSED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export enum CampaignType {
  COMMERCIAL = 'COMMERCIAL',
  NOTIFICATION = 'NOTIFICATION',
  OTHER = 'OTHER'
}

export interface Campaign {
  id: string;
  name: string;
  description?: string;
  type: CampaignType;
  status: CampaignStatus;
  createdAt: string;
}

export interface CreateCampaignDto {
  name: string;
  description?: string;
  type: CampaignType;
}
