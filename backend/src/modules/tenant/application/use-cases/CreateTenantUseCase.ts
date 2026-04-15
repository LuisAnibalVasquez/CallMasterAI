import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import type { ITenantRepository } from '../../domain/interfaces/ITenantRepository';
import type { IUserProvisioningService } from '../ports/IUserProvisioningService';
import type { IPasswordHasher } from '../../../identity/application/ports/IPasswordHasher';
import { Tenant } from '../../domain/entities/Tenant';
import { TENANT_TOKENS } from '../constants/injection-tokens';
import { IDENTITY_TOKENS } from '../../../identity/application/constants/injection-tokens';

export interface CreateTenantRequest {
  name: string;
  phone: string;
  adminEmail: string;
}

export interface CreateTenantResponse {
  id: string;
  name: string;
  adminEmail: string;
  temporaryPassword: string;
}

@Injectable()
export class CreateTenantUseCase {
  private readonly STATIC_PASSWORD = 'Admin123!';

  constructor(
    @Inject(TENANT_TOKENS.TENANT_REPOSITORY)
    private readonly tenantRepository: ITenantRepository,
    @Inject(TENANT_TOKENS.USER_PROVISIONING_SERVICE)
    private readonly userProvisioningService: IUserProvisioningService,
    @Inject(IDENTITY_TOKENS.PASSWORD_HASHER)
    private readonly passwordHasher: IPasswordHasher,
  ) {}

  async execute(request: CreateTenantRequest): Promise<CreateTenantResponse> {
    const isEmailAvailable =
      await this.userProvisioningService.isEmailAvailable(request.adminEmail);
    if (!isEmailAvailable) {
      throw new BadRequestException(
        `El email ${request.adminEmail} ya está en uso.`,
      );
    }

    const tenantId = randomUUID();
    const tenant = new Tenant({
      id: tenantId,
      name: request.name,
      phone: request.phone,
      adminEmail: request.adminEmail,
    });

    await this.tenantRepository.save(tenant);

    const passwordHash = await this.passwordHasher.hash(this.STATIC_PASSWORD);

    await this.userProvisioningService.provisionInitialUser({
      email: request.adminEmail,
      passwordHash,
      tenantId: tenant.id,
      roleName: 'TenantAdmin',
      mustChangePassword: true,
    });

    return {
      id: tenant.id,
      name: tenant.name,
      adminEmail: tenant.adminEmail,
      temporaryPassword: this.STATIC_PASSWORD,
    };
  }
}
