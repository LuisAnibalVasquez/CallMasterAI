import { Entity, PrimaryColumn, Column } from 'typeorm';
import { CampaignFileType } from '../../domain/enums';

@Entity('campaign_files')
export class CampaignFileOrmEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  campaignId: string;

  @Column({
    type: 'enum',
    enum: CampaignFileType,
  })
  type: CampaignFileType;

  @Column()
  path: string;

  @Column()
  originalName: string;

  @Column()
  uploadedAt: Date;
}
