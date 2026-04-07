import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { LoginUseCase } from '../../application/use-cases/LoginUseCase';
import { ChangePasswordUseCase } from '../../application/use-cases/ChangePasswordUseCase';
import { RequestPasswordResetUseCase } from '../../application/use-cases/RequestPasswordResetUseCase';
import { CompletePasswordResetUseCase } from '../../application/use-cases/CompletePasswordResetUseCase';
import { LoginRequestDto, ChangePasswordRequestDto, RequestPasswordResetDto, CompletePasswordResetDto } from '../../application/dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Identity (DOM-1)')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly changePasswordUseCase: ChangePasswordUseCase,
    private readonly requestResetUseCase: RequestPasswordResetUseCase,
    private readonly completeResetUseCase: CompletePasswordResetUseCase,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'RF-1.01: Iniciar sesión en el portal' })
  @ApiResponse({ status: 200, description: 'Sesión iniciada correctamente' })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  async login(@Body() dto: LoginRequestDto) {
    return await this.loginUseCase.execute(dto);
  }

  @Post('change-password')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'RF-1.03: Cambiar contraseña (usuario autenticado)' })
  @ApiResponse({ status: 200, description: 'Contraseña cambiada exitosamente' })
  async changePassword(@Request() req: any, @Body() dto: ChangePasswordRequestDto) {
    await this.changePasswordUseCase.execute(req.user.userId, dto);
    return { message: 'Contraseña actualizada' };
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ summary: 'RF-1.04: Solicitar recuperación de contraseña (envía email)' })
  @ApiResponse({ status: 202, description: 'Recuperación solicitada' })
  async forgotPassword(@Body() dto: RequestPasswordResetDto) {
    await this.requestResetUseCase.execute(dto);
    return { message: 'Si el correo existe, se enviarán las instrucciones de recuperación.' };
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'RF-1.04: Completar restablecimiento de contraseña' })
  @ApiResponse({ status: 200, description: 'Contraseña restablecida' })
  async resetPassword(@Body() dto: CompletePasswordResetDto) {
    await this.completeResetUseCase.execute(dto);
    return { message: 'Contraseña restablecida exitosamente' };
  }
}
