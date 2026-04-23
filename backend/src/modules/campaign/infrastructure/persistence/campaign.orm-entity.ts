import { Entity, PrimaryColumn, Column } from 'typeorm';
import { CampaignStatus, CampaignType } from '../../domain/enums';

@Entity('campaigns')
export class CampaignOrmEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  tenantId: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: CampaignType,
  })
  type: CampaignType;

  @Column({
    type: 'enum',
    enum: CampaignStatus,
  })
  status: CampaignStatus;

  @Column()
  createdAt: Date;

  @Column()
  createdByUserId: string;

  @Column({ nullable: true })
  startedAt?: Date;

  @Column({ nullable: true })
  startedByUserId?: string;

  @Column({ nullable: true })
  endedAt?: Date;

  @Column({ nullable: true })
  cancelledAt?: Date;

  @Column({ nullable: true })
  cancelledByUserId?: string;
}
