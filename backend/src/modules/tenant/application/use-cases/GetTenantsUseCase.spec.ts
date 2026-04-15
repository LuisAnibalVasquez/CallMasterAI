import { GetTenantsUseCase } from './GetTenantsUseCase';
import { ITenantRepository } from '../../domain/interfaces/ITenantRepository';
import { Tenant } from '../../domain/entities/Tenant';

describe('GetTenantsUseCase', () => {
  let useCase: GetTenantsUseCase;
  let tenantRepository: jest.Mocked<ITenantRepository>;

  beforeEach(() => {
    tenantRepository = {
      save: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
    };

    useCase = new GetTenantsUseCase(tenantRepository);
  });

  it('should return all tenants from the repository', async () => {
    // Arrange
    const tenants = [
      new Tenant({ id: '1', name: 'Tenant 1', phone: '123', adminEmail: '1@t.com' }),
      new Tenant({ id: '2', name: 'Tenant 2', phone: '456', adminEmail: '2@t.com' }),
    ];
    tenantRepository.findAll.mockResolvedValue(tenants);

    // Act
    const result = await useCase.execute();

    // Assert
    expect(result).toHaveLength(2);
    expect(result[0].id).toBe('1');
    expect(result[1].id).toBe('2');
    expect(tenantRepository.findAll).toHaveBeenCalledTimes(1);
  });

  it('should return an empty list if no tenants exist', async () => {
    // Arrange
    tenantRepository.findAll.mockResolvedValue([]);

    // Act
    const result = await useCase.execute();

    // Assert
    expect(result).toEqual([]);
    expect(tenantRepository.findAll).toHaveBeenCalledTimes(1);
  });
});
