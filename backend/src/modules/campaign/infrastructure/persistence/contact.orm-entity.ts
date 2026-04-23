import { Entity, PrimaryColumn, Column } from 'typeorm';
import { ContactStatus } from '../../domain/enums';

@Entity('contacts')
export class ContactOrmEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  campaignId: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column({
    type: 'enum',
    enum: ContactStatus,
  })
  status: ContactStatus;
}
