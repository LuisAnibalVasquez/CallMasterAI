import { ToggleTenantStatusUseCase } from './ToggleTenantStatusUseCase';
import { ITenantRepository } from '../../domain/interfaces/ITenantRepository';
import { Tenant } from '../../domain/entities/Tenant';

describe('ToggleTenantStatusUseCase', () => {
  let useCase: ToggleTenantStatusUseCase;
  let tenantRepository: jest.Mocked<ITenantRepository>;

  beforeEach(() => {
    tenantRepository = {
      save: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
    };

    useCase = new ToggleTenantStatusUseCase(tenantRepository);
  });

  it('should deactivate an active tenant', async () => {
    // Arrange
    const tenant = new Tenant({ id: '1', name: 'T1', phone: '123', adminEmail: '1@t.com', isActive: true });
    tenantRepository.findById.mockResolvedValue(tenant);

    // Act
    await useCase.execute('1');

    // Assert
    expect(tenant.isActive).toBe(false);
    expect(tenantRepository.update).toHaveBeenCalledWith(tenant);
  });

  it('should activate an inactive tenant', async () => {
    // Arrange
    const tenant = new Tenant({ id: '1', name: 'T1', phone: '123', adminEmail: '1@t.com', isActive: false });
    tenantRepository.findById.mockResolvedValue(tenant);

    // Act
    await useCase.execute('1');

    // Assert
    expect(tenant.isActive).toBe(true);
    expect(tenantRepository.update).toHaveBeenCalledWith(tenant);
  });

  it('should throw error if tenant not found', async () => {
    // Arrange
    tenantRepository.findById.mockResolvedValue(null);

    // Act & Assert
    await expect(useCase.execute('1')).rejects.toThrow('Tenant not found');
  });
});
