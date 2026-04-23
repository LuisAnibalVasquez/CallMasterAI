import { CampaignFileType } from '../enums';

export interface CampaignFileProps {
  id: string;
  campaignId: string;
  type: CampaignFileType;
  path: string;
  originalName: string;
}

export class CampaignFile {
  private _id: string;
  private _campaignId: string;
  private _type: CampaignFileType;
  private _path: string;
  private _originalName: string;
  private _uploadedAt: Date;

  static fromPersistence(props: {
    id: string;
    campaignId: string;
    type: CampaignFileType;
    path: string;
    originalName: string;
    uploadedAt: Date;
  }): CampaignFile {
    const file = new CampaignFile({
      id: props.id,
      campaignId: props.campaignId,
      type: props.type,
      path: props.path,
      originalName: props.originalName,
    });
    file._uploadedAt = props.uploadedAt;
    return file;
  }

  constructor(props: CampaignFileProps) {
    this._id = props.id;
    this._campaignId = props.campaignId;
    this._type = props.type;
    this._path = props.path;
    this._originalName = props.originalName;
    this._uploadedAt = new Date();
  }

  get id(): string {
    return this._id;
  }
  get campaignId(): string {
    return this._campaignId;
  }
  get type(): CampaignFileType {
    return this._type;
  }
  get path(): string {
    return this._path;
  }
  get originalName(): string {
    return this._originalName;
  }
  get uploadedAt(): Date {
    return this._uploadedAt;
  }
}
