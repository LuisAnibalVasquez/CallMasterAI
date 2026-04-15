import { UserProvisioningAdapter } from './UserProvisioningAdapter';
import { IUserRepository } from '../../../identity/domain/repositories/IUserRepository';
import { IRoleRepository } from '../../../identity/domain/repositories/IRoleRepository';
import { Role } from '../../../identity/domain/entities/Role';
import { User } from '../../../identity/domain/entities/User';

describe('UserProvisioningAdapter', () => {
  let adapter: UserProvisioningAdapter;
  let userRepository: jest.Mocked<IUserRepository>;
  let roleRepository: jest.Mocked<IRoleRepository>;

  beforeEach(() => {
    userRepository = {
      findById: jest.fn(),
      findByEmail: jest.fn(),
      save: jest.fn(),
      create: jest.fn(),
    };
    roleRepository = {
      findByName: jest.fn(),
      findById: jest.fn(),
      save: jest.fn(),
    };

    adapter = new UserProvisioningAdapter(userRepository, roleRepository);
  });

  it('should provision a user successfully', async () => {
    // Arrange
    const data = {
      email: 'admin@test.com',
      passwordHash: 'hashed',
      tenantId: 'tenant-1',
      roleName: 'TenantAdmin',
      mustChangePassword: true as const,
    };
    const mockRole = new Role('role-1', 'TenantAdmin', 'Desc');
    roleRepository.findByName.mockResolvedValue(mockRole);

    // Act
    await adapter.provisionInitialUser(data);

    // Assert
    expect(roleRepository.findByName).toHaveBeenCalledWith('TenantAdmin');
    expect(userRepository.save).toHaveBeenCalledWith(expect.any(User));
    const savedUser = userRepository.save.mock.calls[0][0];
    expect(savedUser.email).toBe(data.email);
    expect(savedUser.tenantId).toBe(data.tenantId);
    expect(savedUser.roleId).toBe(mockRole.id);
  });

  it('should throw error if role not found', async () => {
    // Arrange
    roleRepository.findByName.mockResolvedValue(null);

    // Act & Assert
    await expect(adapter.provisionInitialUser({
      email: 'a@b.com',
      passwordHash: 'h',
      tenantId: 't',
      roleName: 'Invalid',
      mustChangePassword: true,
    })).rejects.toThrow('Role Invalid not found');
  });
});
