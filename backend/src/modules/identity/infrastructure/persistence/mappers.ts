import { User } from '../../domain/entities/User';
import { UserOrmEntity } from './user.orm-entity';

export class IdentityMappers {
  static toDomainUser(ormUser: UserOrmEntity): User {
    return new User(
      ormUser.id,
      ormUser.email,
      ormUser.passwordHash,
      ormUser.roleId,
      ormUser.tenantId,
      ormUser.mustChangePassword,
      ormUser.passwordLastChangedAt,
      ormUser.isActive,
      ormUser.createdAt,
      ormUser.lastLoginAt,
    );
  }

  static toOrmUser(domainUser: User): UserOrmEntity {
    const orm = new UserOrmEntity();
    orm.id = domainUser.id;
    orm.email = domainUser.email;
    orm.passwordHash = domainUser.passwordHash;
    orm.roleId = domainUser.roleId;
    orm.tenantId = domainUser.tenantId;
    orm.mustChangePassword = domainUser.mustChangePassword;
    orm.passwordLastChangedAt = domainUser.passwordLastChangedAt;
    orm.isActive = domainUser.isActive;
    orm.lastLoginAt = domainUser.lastLoginAt!;
    return orm;
  }
}
