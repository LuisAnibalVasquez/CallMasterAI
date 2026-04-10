import { Entity, PrimaryColumn, Column, UpdateDateColumn } from 'typeorm';

@Entity('tenant_settings')
export class TenantSettingsOrmEntity {
  @PrimaryColumn('uuid')
  tenantId!: string;

  @Column({ type: 'int', default: 90 })
  passwordExpiryDays!: number;

  @UpdateDateColumn()
  updatedAt!: Date;
}
