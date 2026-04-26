import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { AiModule } from './modules/ai/ai.module';
import { TransparencyModule } from './modules/ai/transparency/transparency.module';
import { PrismaModule } from './database/prisma.module';
import { PublicDataModule } from './modules/public-data/public-data.module';
import appConfig from './config/app.config';

@Module({
  imports: [
    // ── Variáveis de ambiente ────────────────────────────────────────────────
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      envFilePath: ['.env'],
    }),

    // ── Rate limiting — 20 req / 60 s por IP ────────────────────────────────
    ThrottlerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => [
        {
          ttl: (configService.get<number>('app.throttle.ttl') ?? 60) * 1000,
          limit: configService.get<number>('app.throttle.limit') ?? 20,
        },
      ],
    }),

    // ── Módulos de domínio ───────────────────────────────────────────────────
    PrismaModule,
    AiModule,
    TransparencyModule,
    PublicDataModule,
  ],
})
export class AppModule {}
