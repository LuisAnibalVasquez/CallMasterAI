import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CreateTenantUseCase } from '../../application/use-cases/CreateTenantUseCase';
import { GetTenantsUseCase } from '../../application/use-cases/GetTenantsUseCase';
import { ToggleTenantStatusUseCase } from '../../application/use-cases/ToggleTenantStatusUseCase';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { RolesGuard } from '../../../../common/guards/roles.guard';
import { Roles } from '../../../../common/decorators/roles.decorator';

@ApiTags('Tenants (DOM-1 RF-2.01, RF-2.02)')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('PlatformOwner')
@Controller('tenants')
export class TenantsController {
  constructor(
    private readonly createTenantUseCase: CreateTenantUseCase,
    private readonly getTenantsUseCase: GetTenantsUseCase,
    private readonly toggleTenantStatusUseCase: ToggleTenantStatusUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary:
      'RF-2.01, RF-2.02: Crear un nuevo tenant y su usuario administrador inicial',
  })
  @ApiResponse({ status: 201, description: 'Tenant creado exitosamente' })
  async createTenant(@Body() dto: CreateTenantDto) {
    return this.createTenantUseCase.execute(dto);
  }

  @Get()
  @ApiOperation({ summary: 'RF-2.03: Listar todos los tenants registrados' })
  @ApiResponse({ status: 200, description: 'Lista de tenants' })
  async getTenants() {
    return this.getTenantsUseCase.execute();
  }

  @Put(':id/toggle-status')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'RF-2.04: Activar/desactivar un tenant' })
  @ApiResponse({ status: 200, description: 'Estado del tenant actualizado' })
  async toggleStatus(@Param('id') id: string) {
    return this.toggleTenantStatusUseCase.execute(id);
  }
}
