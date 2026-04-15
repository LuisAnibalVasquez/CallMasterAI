import { IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordPolicyDto {
  @ApiProperty({
    description:
      'Días de caducidad de contraseña. Valores permitidos: 30, 60, 90 o 180.',
    enum: [30, 60, 90, 180],
    example: 90,
  })
  @IsIn([30, 60, 90, 180], {
    message: 'passwordExpiryDays debe ser 30, 60, 90 o 180',
  })
  passwordExpiryDays!: 30 | 60 | 90 | 180;
}

export class PasswordPolicyResponseDto {
  @ApiProperty({ example: '3f4e5d6c-...' })
  tenantId!: string;

  @ApiProperty({ example: 90, enum: [30, 60, 90, 180] })
  passwordExpiryDays!: number;

  @ApiProperty()
  updatedAt!: Date;
}
