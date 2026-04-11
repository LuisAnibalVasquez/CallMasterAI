import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('tenants')
export class TenantOrmEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  adminEmail: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'decimal', default: 0 })
  incurredSpend: number;
}
