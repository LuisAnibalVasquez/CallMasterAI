import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginRequestDto {
  @ApiProperty({ example: 'admin@callmaster.ai' })
  @IsEmail({}, { message: 'El formato del email es inválido' })
  @IsNotEmpty()
  email!: string;

  @ApiProperty({ example: 'Password123!', minLength: 8 })
  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  password!: string;
}

export class ChangePasswordRequestDto {
  @ApiProperty({ example: 'OldPassword123!' })
  @IsString()
  @IsNotEmpty()
  currentPassword!: string;

  @ApiProperty({ example: 'NewPassword123!', minLength: 8 })
  @IsString()
  @IsNotEmpty()
  @MinLength(8, {
    message: 'La nueva contraseña debe tener al menos 8 caracteres',
  })
  newPassword!: string;
}

export class RequestPasswordResetDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail({}, { message: 'El formato del email es inválido' })
  @IsNotEmpty()
  email!: string;
}

export class CompletePasswordResetDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsString()
  @IsNotEmpty()
  token!: string;

  @ApiProperty({ example: 'NewPassword123!', minLength: 8 })
  @IsString()
  @IsNotEmpty()
  @MinLength(8, {
    message: 'La nueva contraseña debe tener al menos 8 caracteres',
  })
  newPassword!: string;
}
