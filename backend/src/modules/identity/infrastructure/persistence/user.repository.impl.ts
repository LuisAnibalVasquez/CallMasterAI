import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { User } from '../../domain/entities/User';
import { UserOrmEntity } from './user.orm-entity';
import { IdentityMappers } from './mappers';

@Injectable()
export class UserRepositoryImpl implements IUserRepository {
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly repo: Repository<UserOrmEntity>,
  ) {}

  async findById(id: string): Promise<User | null> {
    const ormUser = await this.repo.findOneBy({ id });
    return ormUser ? IdentityMappers.toDomainUser(ormUser) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const ormUser = await this.repo.findOne({
      where: { email },
      relations: ['role'],
    });
    return ormUser ? IdentityMappers.toDomainUser(ormUser) : null;
  }

  async save(user: User): Promise<void> {
    const ormEntity = IdentityMappers.toOrmUser(user);
    await this.repo.save(ormEntity);
  }

  async create(user: User): Promise<void> {
    const ormEntity = IdentityMappers.toOrmUser(user);
    // Usually save handles both, but create emphasizes inserts
    await this.repo.save(ormEntity);
  }
}
