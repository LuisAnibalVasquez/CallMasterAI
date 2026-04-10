import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ITenantSettingsRepository } from '../../domain/repositories/ITenantSettingsRepository';
import { TenantSettings, PasswordExpiryDays } from '../../domain/entities/TenantSettings';
import { TenantSettingsOrmEntity } from './tenant-settings.orm-entity';

@Injectable()
export class TenantSettingsRepositoryImpl implements ITenantSettingsRepository {
  constructor(
    @InjectRepository(TenantSettingsOrmEntity)
    private readonly repo: Repository<TenantSettingsOrmEntity>,
  ) {}

  async findByTenantId(tenantId: string): Promise<TenantSettings | null> {
    const orm = await this.repo.findOneBy({ tenantId });
    if (!orm) return null;
    return new TenantSettings(
      orm.tenantId,
      orm.passwordExpiryDays as PasswordExpiryDays,
      orm.updatedAt,
    );
  }

  async save(settings: TenantSettings): Promise<void> {
    const orm = new TenantSettingsOrmEntity();
    orm.tenantId = settings.tenantId;
    orm.passwordExpiryDays = settings.passwordExpiryDays;
    await this.repo.save(orm);
  }
}
