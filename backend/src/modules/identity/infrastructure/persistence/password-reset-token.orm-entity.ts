import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('password_reset_tokens')
export class PasswordResetTokenOrmEntity {
  @PrimaryColumn('uuid')
  id!: string;

  @Column('uuid')
  userId!: string;

  @ManyToOne('UserOrmEntity')
  @JoinColumn({ name: 'userId' })
  user!: any;

  @Column({ unique: true })
  tokenHash!: string;

  @Column()
  expiresAt!: Date;

  @Column({ nullable: true })
  usedAt!: Date;

  @CreateDateColumn()
  createdAt!: Date;
}
