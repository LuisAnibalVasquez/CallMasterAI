import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TenantContextService } from './tenant-context.service';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  constructor(private readonly tenantContextService: TenantContextService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const user = req.user as { tenantId?: string } | undefined;
    if (user && user.tenantId) {
      this.tenantContextService.run(user.tenantId, next);
    } else {
      next();
    }
  }
}
