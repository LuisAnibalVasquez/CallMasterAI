import { Test, TestingModule } from '@nestjs/testing';
import { LoginUseCase } from './LoginUseCase';
import { IDENTITY_TOKENS } from '../constants/injection-tokens';
import { UnauthorizedException } from '@nestjs/common';
import { User } from '../../domain/entities/User';

describe('LoginUseCase', () => {
  let useCase: LoginUseCase;

  const mockUserRepository = {
    findByEmail: jest.fn(),
    save: jest.fn(),
  };
  const mockPasswordHasher = {
    compare: jest.fn(),
  };
  const mockTokenService = {
    generateToken: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoginUseCase,
        {
          provide: IDENTITY_TOKENS.USER_REPOSITORY,
          useValue: mockUserRepository,
        },
        {
          provide: IDENTITY_TOKENS.PASSWORD_HASHER,
          useValue: mockPasswordHasher,
        },
        { provide: IDENTITY_TOKENS.TOKEN_SERVICE, useValue: mockTokenService },
      ],
    }).compile();

    useCase = module.get<LoginUseCase>(LoginUseCase);
  });

  it('should throw UnauthorizedException if user not found', async () => {
    mockUserRepository.findByEmail.mockResolvedValue(null);

    await expect(
      useCase.execute({ email: 'test@example.com', password: 'pw' }),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('should authenticate and return token with roleName', async () => {
    const user = new User(
      '1',
      'test@example.com',
      'hashed',
      'roleId',
      'PlatformOwner',
      null,
      false,
      new Date(),
      true,
      new Date(),
      null,
    );
    mockUserRepository.findByEmail.mockResolvedValue(user);
    mockPasswordHasher.compare.mockResolvedValue(true);
    mockTokenService.generateToken.mockResolvedValue('jwt-token');
    mockUserRepository.save = jest.fn();

    const result = await useCase.execute({
      email: 'test@example.com',
      password: 'pw',
    });

    expect(result.success).toBe(true);
    expect(result.token).toBe('jwt-token');
    expect(result.roleName).toBe('PlatformOwner');
    expect(mockUserRepository.save).toHaveBeenCalled();
  });
});
