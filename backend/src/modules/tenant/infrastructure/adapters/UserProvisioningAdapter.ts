import { Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { IUserProvisioningService } from '../../application/ports/IUserProvisioningService';
import { IDENTITY_TOKENS } from '../../../identity/application/constants/injection-tokens';
import type { IUserRepository } from '../../../identity/domain/repositories/IUserRepository';
import type { IRoleRepository } from '../../../identity/domain/repositories/IRoleRepository';
import { User } from '../../../identity/domain/entities/User';

@Injectable()
export class UserProvisioningAdapter implements IUserProvisioningService {
  constructor(
    @Inject(IDENTITY_TOKENS.USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(IDENTITY_TOKENS.ROLE_REPOSITORY)
    private readonly roleRepository: IRoleRepository,
  ) {}

  async isEmailAvailable(email: string): Promise<boolean> {
    const user = await this.userRepository.findByEmail(email);
    return user === null;
  }

  async provisionInitialUser(data: {
    email: string;
    passwordHash: string;
    tenantId: string;
    roleName: string;
    mustChangePassword: true;
  }): Promise<void> {
    const role = await this.roleRepository.findByName(data.roleName);
    if (!role) {
      throw new Error(`Role ${data.roleName} not found`);
    }

    const user = new User(
      randomUUID(),
      data.email,
      data.passwordHash,
      role.id,
      role.name,
      data.tenantId,
      data.mustChangePassword,
      new Date(),
      true,
      new Date(),
      null,
    );

    await this.userRepository.save(user);
  }
}
