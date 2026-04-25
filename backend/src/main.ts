import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuração Global de Validação
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Configuração de CORS
  app.enableCors();

  // Configuração de Swagger
  const config = new DocumentBuilder()
    .setTitle('TransparêncIA Cidadã API')
    .setDescription(
      'Documentação da API de Inteligência Artificial para Transparência Pública',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('app.port') ?? 3000;

  await app.listen(port, () => {
    console.log(`🚀 Aplicação rodando em http://localhost:${port}`);
    console.log(`📖 Documentação Swagger: http://localhost:${port}/api`);
  });
}

bootstrap().catch((error) => {
  console.error('Erro ao iniciar a aplicação:', error);
  process.exit(1);
});
