import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IRoleRepository } from '../../domain/repositories/IRoleRepository';
import { Role } from '../../domain/entities/Role';
import { RoleOrmEntity } from './role.orm-entity';

@Injectable()
export class RoleRepositoryImpl implements IRoleRepository {
  constructor(
    @InjectRepository(RoleOrmEntity)
    private readonly repository: Repository<RoleOrmEntity>,
  ) {}

  async findByName(name: string): Promise<Role | null> {
    const orm = await this.repository.findOneBy({ name });
    if (!orm) return null;
    return new Role(orm.id, orm.name, orm.description, orm.createdAt, orm.updatedAt);
  }

  async findById(id: string): Promise<Role | null> {
    const orm = await this.repository.findOneBy({ id });
    if (!orm) return null;
    return new Role(orm.id, orm.name, orm.description, orm.createdAt, orm.updatedAt);
  }

  async save(role: Role): Promise<void> {
    const orm = this.repository.create({
      id: role.id,
      name: role.name,
      description: role.description ?? undefined,
    });
    await this.repository.save(orm);
  }
}
