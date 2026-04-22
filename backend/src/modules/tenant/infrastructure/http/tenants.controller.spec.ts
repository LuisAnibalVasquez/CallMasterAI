/* eslint-disable @typescript-eslint/unbound-method */
import { TenantsController } from './tenants.controller';
import { CreateTenantUseCase } from '../../application/use-cases/CreateTenantUseCase';
import { GetTenantsUseCase } from '../../application/use-cases/GetTenantsUseCase';
import { ToggleTenantStatusUseCase } from '../../application/use-cases/ToggleTenantStatusUseCase';
import { CreateTenantDto } from './dto/create-tenant.dto';

describe('TenantsController', () => {
  let controller: TenantsController;
  let createTenantUseCase: jest.Mocked<CreateTenantUseCase>;
  let getTenantsUseCase: jest.Mocked<GetTenantsUseCase>;
  let toggleTenantStatusUseCase: jest.Mocked<ToggleTenantStatusUseCase>;

  beforeEach(() => {
    createTenantUseCase = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<CreateTenantUseCase>;
    getTenantsUseCase = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<GetTenantsUseCase>;
    toggleTenantStatusUseCase = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<ToggleTenantStatusUseCase>;

    controller = new TenantsController(
      createTenantUseCase,
      getTenantsUseCase,
      toggleTenantStatusUseCase,
    );
  });

  it('should create a tenant', async () => {
    const dto: CreateTenantDto = {
      name: 'Test',
      phone: '+1234567890',
      adminEmail: 'test@test.com',
    };
    createTenantUseCase.execute.mockResolvedValue({
      id: '1',
      name: 'Test',
      adminEmail: 'test@test.com',
      temporaryPassword: 'pass',
    });

    const result = await controller.createTenant(dto);

    expect(jest.mocked(createTenantUseCase.execute)).toHaveBeenCalledWith(dto);
    expect(result).toEqual({
      id: '1',
      name: 'Test',
      adminEmail: 'test@test.com',
      temporaryPassword: 'pass',
    });
  });

  it('should list tenants', async () => {
    getTenantsUseCase.execute.mockResolvedValue([]);

    const result = await controller.getTenants();

    expect(jest.mocked(getTenantsUseCase.execute)).toHaveBeenCalled();
    expect(result).toEqual([]);
  });

  it('should toggle tenant status', async () => {
    toggleTenantStatusUseCase.execute.mockResolvedValue(undefined);

    await controller.toggleStatus('1');

    expect(jest.mocked(toggleTenantStatusUseCase.execute)).toHaveBeenCalledWith(
      '1',
    );
  });
});
