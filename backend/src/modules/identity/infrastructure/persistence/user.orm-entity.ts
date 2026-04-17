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
  /** UUID del usuario (PK) */
  @PrimaryColumn('uuid')
  id!: string;

  /** Email único del usuario */
  @Column({ unique: true })
  email!: string;

  /** Hash de la contraseña (no almacenar contraseñas en claro) */
  @Column()
  passwordHash!: string;

  @Column('uuid')
  roleId!: string;

  @ManyToOne(() => RoleOrmEntity, (role: RoleOrmEntity) => role.users)
  @JoinColumn({ name: 'roleId' })
  role!: RoleOrmEntity;

  /** Tenant al que pertenece el usuario (nullable para platform owner) */
  @Column('uuid', { nullable: true })
  tenantId!: string | null;

  @Column({ default: true })
  mustChangePassword!: boolean;

  /** Fecha del último cambio de contraseña */
  @Column()
  passwordLastChangedAt!: Date;

  @Column({ default: true })
  isActive!: boolean;

  /** Fecha de creación del registro */
  @CreateDateColumn()
  createdAt!: Date;

  @Column({ nullable: true })
  lastLoginAt!: Date;
}
