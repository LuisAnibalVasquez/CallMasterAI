import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IPasswordResetTokenRepository } from '../../domain/repositories/IPasswordResetTokenRepository';
import { PasswordResetToken } from '../../domain/entities/PasswordResetToken';
import { PasswordResetTokenOrmEntity } from './password-reset-token.orm-entity';

@Injectable()
export class PasswordResetTokenRepositoryImpl implements IPasswordResetTokenRepository {
  constructor(
    @InjectRepository(PasswordResetTokenOrmEntity) private readonly repo: Repository<PasswordResetTokenOrmEntity>,
  ) {}

  async findByTokenHash(tokenHash: string): Promise<PasswordResetToken | null> {
    const orm = await this.repo.findOneBy({ tokenHash });
    if (!orm) return null;
    return new PasswordResetToken(
      orm.id,
      orm.userId,
      orm.tokenHash,
      orm.expiresAt,
      orm.usedAt,
      orm.createdAt,
    );
  }

  async save(token: PasswordResetToken): Promise<void> {
    const orm = new PasswordResetTokenOrmEntity();
    orm.id = token.id;
    orm.userId = token.userId;
    orm.tokenHash = token.tokenHash;
    orm.expiresAt = token.expiresAt;
    orm.usedAt = token.usedAt!;
    await this.repo.save(orm);
  }
}
