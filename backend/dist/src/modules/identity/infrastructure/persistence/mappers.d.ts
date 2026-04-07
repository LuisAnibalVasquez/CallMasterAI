import { User } from '../../domain/entities/User';
import { UserOrmEntity } from './user.orm-entity';
export declare class IdentityMappers {
    static toDomainUser(ormUser: UserOrmEntity): User;
    static toOrmUser(domainUser: User): UserOrmEntity;
}
