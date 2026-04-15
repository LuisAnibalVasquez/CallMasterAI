import { CreateTenantUseCase } from './CreateTenantUseCase';
import { ITenantRepository } from '../../domain/interfaces/ITenantRepository';
import { IUserProvisioningService } from '../ports/IUserProvisioningService';
import { IPasswordHasher } from '../../../identity/application/ports/IPasswordHasher';
import { Tenant } from '../../domain/entities/Tenant';

describe('CreateTenantUseCase', () => {
  let useCase: CreateTenantUseCase;
  let tenantRepository: jest.Mocked<ITenantRepository>;
  let userProvisioningService: jest.Mocked<IUserProvisioningService>;
  let passwordHasher: jest.Mocked<IPasswordHasher>;

  beforeEach(() => {
    tenantRepository = {
      save: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
    };
    userProvisioningService = {
      isEmailAvailable: jest.fn().mockResolvedValue(true),
      provisionInitialUser: jest.fn(),
    };
    passwordHasher = {
      hash: jest.fn(),
      compare: jest.fn(),
    };

    useCase = new CreateTenantUseCase(
      tenantRepository,
      userProvisioningService,
      passwordHasher,
    );
  });

  it('should create a tenant and provision the initial user with a static password', async () => {
    // Arrange
    const request = {
      name: 'Test Tenant',
      phone: '123456789',
      adminEmail: 'admin@test.com',
    };
    passwordHasher.hash.mockResolvedValue('hashed_password');

    // Act
    const result = await useCase.execute(request);

    // Assert
    expect(tenantRepository.save).toHaveBeenCalledWith(expect.any(Tenant));
    expect(passwordHasher.hash).toHaveBeenCalledWith('Admin123!');
    expect(userProvisioningService.provisionInitialUser).toHaveBeenCalledWith({
      email: request.adminEmail,
      passwordHash: 'hashed_password',
      tenantId: result.id,
      roleName: 'TenantAdmin',
      mustChangePassword: true,
    });
    expect(result).toEqual({
      id: expect.any(String),
      name: request.name,
      adminEmail: request.adminEmail,
      temporaryPassword: 'Admin123!',
    });
  });

  it('should generate different IDs for different tenants', async () => {
    // Arrange
    const request1 = { name: 'Tenant 1', phone: '1', adminEmail: '1@test.com' };
    const request2 = { name: 'Tenant 2', phone: '2', adminEmail: '2@test.com' };
    passwordHasher.hash.mockResolvedValue('hashed');

    // Act
    const result1 = await useCase.execute(request1);
    const result2 = await useCase.execute(request2);

    // Assert
    expect(result1.id).not.toBe(result2.id);
    expect(result1.name).toBe('Tenant 1');
    expect(result2.name).toBe('Tenant 2');
  });
});
