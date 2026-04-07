import { Repository } from 'typeorm';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { User } from '../../domain/entities/User';
import { UserOrmEntity } from './user.orm-entity';
export declare class UserRepositoryImpl implements IUserRepository {
    private readonly repo;
    constructor(repo: Repository<UserOrmEntity>);
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    save(user: User): Promise<void>;
    create(user: User): Promise<void>;
}
