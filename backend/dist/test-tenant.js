"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./src/app.module");
const CreateTenantUseCase_1 = require("./src/modules/tenant/application/use-cases/CreateTenantUseCase");
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const useCase = app.get(CreateTenantUseCase_1.CreateTenantUseCase);
    try {
        const result = await useCase.execute({
            name: 'Test Tenant',
            phone: '1234567890',
            adminEmail: 'admin@testtenant.com'
        });
        console.log('Success:', result);
    }
    catch (e) {
        console.error('Error occurred:', e.message);
        console.error(e.stack);
    }
    await app.close();
}
bootstrap();
//# sourceMappingURL=test-tenant.js.map