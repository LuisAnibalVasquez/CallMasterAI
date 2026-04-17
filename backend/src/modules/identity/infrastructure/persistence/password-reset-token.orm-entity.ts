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
  /** Identificador del token (PK) */
  @PrimaryColumn('uuid')
  id!: string;

  /** Usuario asociado al token (FK) */
  @Column('uuid')
  userId!: string;

  @ManyToOne('UserOrmEntity')
  @JoinColumn({ name: 'userId' })
  user!: any;

  /** Hash del token enviado por email (no almacenar token en claro) */
  @Column({ unique: true })
  tokenHash!: string;

  /** Fecha de expiración del token */
  @Column()
  expiresAt!: Date;

  /** Marca la fecha en que el token fue usado */
  @Column({ nullable: true })
  usedAt!: Date;

  /** Fecha de creación del registro */
  @CreateDateColumn()
  createdAt!: Date;
}
