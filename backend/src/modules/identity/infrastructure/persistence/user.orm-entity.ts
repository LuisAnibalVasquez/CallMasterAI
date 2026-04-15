import { RoleOrmEntity } from './role.orm-entity';
import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('users')
export class UserOrmEntity {
  @PrimaryColumn('uuid')
  id!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  passwordHash!: string;

  @Column('uuid')
  roleId!: string;

  @ManyToOne(() => RoleOrmEntity, (role: RoleOrmEntity) => role.users)
  @JoinColumn({ name: 'roleId' })
  role!: RoleOrmEntity;

  @Column('uuid', { nullable: true })
  tenantId!: string | null;

  @Column({ default: true })
  mustChangePassword!: boolean;

  @Column()
  passwordLastChangedAt!: Date;

  @Column({ default: true })
  isActive!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @Column({ nullable: true })
  lastLoginAt!: Date;
}
