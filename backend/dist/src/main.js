"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    console.log('[1] Starting bootstrap...');
    console.log('[2] Creating NestFactory...');
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    console.log('[3] App module created');
    app.setGlobalPrefix('api/v1');
    console.log('[4] Global prefix set');
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: { enableImplicitConversion: true },
    }));
    console.log('[5] Validation pipe configured');
    app.enableCors();
    console.log('[6] CORS enabled');
    console.log('[7] Building Swagger config...');
    const config = new swagger_1.DocumentBuilder()
        .setTitle('CallMasterAI API')
        .setDescription('API para la plataforma SaaS de call center virtual con IA')
        .setVersion('1.0')
        .addBearerAuth()
        .addApiKey({ type: 'apiKey', name: 'X-API-Key', in: 'header' }, 'api-key')
        .build();
    console.log('[8] Creating Swagger document...');
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    console.log('[9] Swagger document created');
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    console.log('[10] Swagger setup complete');
    const port = process.env.PORT ?? 3000;
    console.log('[11] Starting to listen on port', port);
    await app.listen(port);
    console.log(`🚀 CallMasterAI API running on http://localhost:${port}`);
    console.log(`📄 Swagger docs at http://localhost:${port}/api/docs`);
}
bootstrap().catch(err => {
    console.error('[ERROR] Bootstrap failed:', err);
    process.exit(1);
});
//# sourceMappingURL=main.js.map