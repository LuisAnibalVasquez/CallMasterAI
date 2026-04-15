import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ITenantRepository } from '../../domain/interfaces/ITenantRepository';
import { Tenant } from '../../domain/entities/Tenant';
import { TenantOrmEntity } from './orm-entities/Tenant.orm-entity';

@Injectable()
export class TenantRepositoryImpl implements ITenantRepository {
  constructor(
    @InjectRepository(TenantOrmEntity)
    private readonly repository: Repository<TenantOrmEntity>,
  ) {}

  async save(tenant: Tenant): Promise<void> {
    const ormEntity = this.repository.create(tenant);
    await this.repository.save(ormEntity);
  }

  async findAll(): Promise<Tenant[]> {
    const ormEntities = await this.repository.find();
    return ormEntities.map(
      (orm) =>
        new Tenant({
          id: orm.id,
          name: orm.name,
          phone: orm.phone,
          adminEmail: orm.adminEmail,
          isActive: orm.isActive,
          incurredSpend: Number(orm.incurredSpend),
        }),
    );
  }

  async findById(id: string): Promise<Tenant | null> {
    const orm = await this.repository.findOneBy({ id });
    if (!orm) return null;
    return new Tenant({
      id: orm.id,
      name: orm.name,
      phone: orm.phone,
      adminEmail: orm.adminEmail,
      isActive: orm.isActive,
      incurredSpend: Number(orm.incurredSpend),
    });
  }

  async update(tenant: Tenant): Promise<void> {
    await this.repository.update(tenant.id, {
      name: tenant.name,
      phone: tenant.phone,
      adminEmail: tenant.adminEmail,
      isActive: tenant.isActive,
      incurredSpend: tenant.incurredSpend,
    });
  }
}
