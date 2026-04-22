import { CampaignStatus, CampaignType } from '../enums';

export interface CampaignProps {
  id: string;
  tenantId: string;
  name: string;
  description: string;
  type: CampaignType;
  createdByUserId: string;
}

export class Campaign {
  private _id: string;
  private _tenantId: string;
  private _name: string;
  private _description: string;
  private _type: CampaignType;
  private _status: CampaignStatus;
  private _createdAt: Date;
  private _createdByUserId: string;
  private _startedAt?: Date;
  private _startedByUserId?: string;
  private _endedAt?: Date;
  private _cancelledAt?: Date;
  private _cancelledByUserId?: string;

  static fromPersistence(
    props: {
      id: string;
      tenantId: string;
      name: string;
      description: string;
      type: CampaignType;
      status: CampaignStatus;
      createdAt: Date;
      createdByUserId: string;
      startedAt?: Date;
      startedByUserId?: string;
      endedAt?: Date;
      cancelledAt?: Date;
      cancelledByUserId?: string;
    }
  ): Campaign {
    const campaign = new Campaign({
      id: props.id,
      tenantId: props.tenantId,
      name: props.name,
      description: props.description,
      type: props.type,
      createdByUserId: props.createdByUserId,
    });
    (campaign as any)._status = props.status;
    (campaign as any)._createdAt = props.createdAt;
    (campaign as any)._startedAt = props.startedAt;
    (campaign as any)._startedByUserId = props.startedByUserId;
    (campaign as any)._endedAt = props.endedAt;
    (campaign as any)._cancelledAt = props.cancelledAt;
    (campaign as any)._cancelledByUserId = props.cancelledByUserId;
    return campaign;
  }

  constructor(props: CampaignProps) {
    this._id = props.id;
    this._tenantId = props.tenantId;
    this._name = props.name;
    this._description = props.description;
    this._type = props.type;
    this._createdByUserId = props.createdByUserId;
    this._status = CampaignStatus.DRAFT;
    this._createdAt = new Date();
  }

  get id(): string { return this._id; }
  get tenantId(): string { return this._tenantId; }
  get name(): string { return this._name; }
  get description(): string { return this._description; }
  get type(): CampaignType { return this._type; }
  get status(): CampaignStatus { return this._status; }
  get createdAt(): Date { return this._createdAt; }
  get createdByUserId(): string { return this._createdByUserId; }
  get startedAt(): Date | undefined { return this._startedAt; }
  get startedByUserId(): string | undefined { return this._startedByUserId; }
  get endedAt(): Date | undefined { return this._endedAt; }
  get cancelledAt(): Date | undefined { return this._cancelledAt; }
  get cancelledByUserId(): string | undefined { return this._cancelledByUserId; }

  setReady(): void {
    this._status = CampaignStatus.READY;
  }

  start(userId: string): void {
    if (this._status !== CampaignStatus.READY) {
      throw new Error('Campaign must be in READY status to start');
    }
    this._status = CampaignStatus.RUNNING;
    this._startedAt = new Date();
    this._startedByUserId = userId;
  }

  cancel(userId: string): void {
    this._status = CampaignStatus.CANCELLED;
    this._cancelledAt = new Date();
    this._cancelledByUserId = userId;
  }
}
