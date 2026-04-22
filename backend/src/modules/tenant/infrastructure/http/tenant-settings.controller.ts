import {
  Controller,
  Get,
  Put,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { GetPasswordPolicyUseCase } from '../../application/use-cases/GetPasswordPolicyUseCase';
import { UpdatePasswordPolicyUseCase } from '../../application/use-cases/UpdatePasswordPolicyUseCase';
import {
  UpdatePasswordPolicyDto,
  PasswordPolicyResponseDto,
} from '../../application/dto/password-policy.dto';

@ApiTags('Tenant Settings (DOM-1 RF-1.05)')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('tenants/settings')
export class TenantSettingsController {
  constructor(
    private readonly getPasswordPolicy: GetPasswordPolicyUseCase,
    private readonly updatePasswordPolicy: UpdatePasswordPolicyUseCase,
  ) {}

  @Get('password-policy')
  @ApiOperation({
    summary: 'RF-1.05: Obtener política de caducidad de contraseña del tenant',
  })
  @ApiResponse({ status: 200, type: PasswordPolicyResponseDto })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  async getPolicy(
    @Request() req: { user: { tenantId: string } },
  ): Promise<PasswordPolicyResponseDto> {
    return this.getPasswordPolicy.execute(req.user.tenantId);
  }

  @Put('password-policy')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary:
      'RF-1.05: Actualizar política de caducidad de contraseña del tenant',
  })
  @ApiResponse({ status: 200, type: PasswordPolicyResponseDto })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  @ApiResponse({ status: 400, description: 'Valor de caducidad inválido' })
  async updatePolicy(
    @Request() req: { user: { tenantId: string } },
    @Body() dto: UpdatePasswordPolicyDto,
  ): Promise<PasswordPolicyResponseDto> {
    return this.updatePasswordPolicy.execute(req.user.tenantId, dto);
  }
}
