import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsBoolean,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTenantDto {
  @ApiProperty({ example: 'Acme Corp' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '+1234567890' })
  @IsPhoneNumber()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: 'admin@acme.com' })
  @IsEmail()
  @IsNotEmpty()
  adminEmail: string;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
