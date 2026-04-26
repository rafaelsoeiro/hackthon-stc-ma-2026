import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { randomUUID } from 'crypto';
import type { NextFunction, Request, Response } from 'express';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Configuração Global de Validação
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      stopAtFirstError: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Configuração de CORS
  app.enableCors({
    origin: configService.get<string>('app.cors.origin') ?? '*',
  });

  // Rastreabilidade de requisicoes (requestId + duracao + status)
  app.use((req: Request, res: Response, next: NextFunction) => {
    const requestId = String(req.headers['x-request-id'] ?? randomUUID());
    const startedAt = Date.now();
    const { method, originalUrl } = req;
    const sourceIp = req.ip;

    res.setHeader('x-request-id', requestId);
    logger.log(
      `[${requestId}] request:start method=${method} path=${originalUrl} ip=${sourceIp}`,
    );

    res.on('finish', () => {
      const durationMs = Date.now() - startedAt;
      logger.log(
        `[${requestId}] request:finish method=${method} path=${originalUrl} status=${res.statusCode} durationMs=${durationMs}`,
      );
    });

    next();
  });

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

  const port = configService.get<number>('app.port') ?? 3000;

  await app.listen(port, () => {
    logger.log(`Aplicacao rodando em http://localhost:${port}`);
    logger.log(`Documentacao Swagger: http://localhost:${port}/api`);
  });
}

bootstrap().catch((error) => {
  const logger = new Logger('Bootstrap');
  logger.error(
    'Erro ao iniciar a aplicacao',
    error instanceof Error ? error.stack : String(error),
  );
  process.exit(1);
});
