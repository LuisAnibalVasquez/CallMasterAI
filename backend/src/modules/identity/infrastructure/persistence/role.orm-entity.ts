import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import type { UserOrmEntity } from './user.orm-entity';

@Entity('roles')
export class RoleOrmEntity {
  /** UUID del rol (PK) */
  @PrimaryColumn('uuid')
  id!: string;

  /** Nombre único del rol (e.g., PlatformOwner, TenantAdmin, Agent) */
  @Column({ unique: true })
  name!: string;

  @Column({ nullable: true })
  description!: string;

  /** Fecha de creación del rol */
  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany('UserOrmEntity', (user: UserOrmEntity) => user.role)
  users!: UserOrmEntity[];
}
