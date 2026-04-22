import { ContactStatus } from '../enums';

export interface ContactProps {
  id: string;
  campaignId: string;
  name: string;
  phone: string;
}

export class Contact {
  private _id: string;
  private _campaignId: string;
  private _name: string;
  private _phone: string;
  private _status: ContactStatus;

  static fromPersistence(
    props: {
      id: string;
      campaignId: string;
      name: string;
      phone: string;
      status: ContactStatus;
    }
  ): Contact {
    const contact = new Contact({
      id: props.id,
      campaignId: props.campaignId,
      name: props.name,
      phone: props.phone,
    });
    (contact as any)._status = props.status;
    return contact;
  }

  constructor(props: ContactProps) {
    this._id = props.id;
    this._campaignId = props.campaignId;
    this._name = props.name;
    this._phone = props.phone;
    this._status = ContactStatus.PENDING;
  }

  get id(): string { return this._id; }
  get campaignId(): string { return this._campaignId; }
  get name(): string { return this._name; }
  get phone(): string { return this._phone; }
  get status(): ContactStatus { return this._status; }
}
