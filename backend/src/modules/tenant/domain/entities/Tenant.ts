export interface TenantProps {
  id: string;
  name: string;
  phone: string;
  adminEmail: string;
  isActive?: boolean;
  incurredSpend?: number;
}

export class Tenant {
  public readonly id: string;
  public name: string;
  public phone: string;
  public adminEmail: string;
  public isActive: boolean;
  public incurredSpend: number;

  constructor(props: TenantProps) {
    this.id = props.id;
    this.name = props.name;
    this.phone = props.phone;
    this.adminEmail = props.adminEmail;
    this.isActive = props.isActive ?? true;
    this.incurredSpend = props.incurredSpend ?? 0;
  }
}
