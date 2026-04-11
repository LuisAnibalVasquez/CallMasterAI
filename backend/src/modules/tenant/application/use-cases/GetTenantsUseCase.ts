import { Inject, Injectable } from '@nestjs/common';
import { ITenantRepository } from '../../domain/interfaces/ITenantRepository';
import { Tenant } from '../../domain/entities/Tenant';
import { TENANT_TOKENS } from '../constants/injection-tokens';

@Injectable()
export class GetTenantsUseCase {
  constructor(
    @Inject(TENANT_TOKENS.TENANT_REPOSITORY)
    private readonly tenantRepository: ITenantRepository
  ) {}

  async execute(): Promise<Tenant[]> {
    return this.tenantRepository.findAll();
  }
}
