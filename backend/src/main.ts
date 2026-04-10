import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  console.log('[1] Starting bootstrap...');
  
  console.log('[2] Creating NestFactory...');
  const app = await NestFactory.create(AppModule);
  console.log('[3] App module created');
  
  // Global prefix
  app.setGlobalPrefix('api/v1');
  console.log('[4] Global prefix set');

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  console.log('[5] Validation pipe configured');

  // CORS
  app.enableCors();
  console.log('[6] CORS enabled');

  // Swagger / OpenAPI
  console.log('[7] Building Swagger config...');
  const config = new DocumentBuilder()
    .setTitle('CallMasterAI API')
    .setDescription('API para la plataforma SaaS de call center virtual con IA')
    .setVersion('1.0')
    .addBearerAuth()
    .addApiKey({ type: 'apiKey', name: 'X-API-Key', in: 'header' }, 'api-key')
    .build();

  console.log('[8] Creating Swagger document...');
  const document = SwaggerModule.createDocument(app, config);
  console.log('[9] Swagger document created');
  
  SwaggerModule.setup('api/docs', app, document);
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
