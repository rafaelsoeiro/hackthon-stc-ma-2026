import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { AiModule } from './modules/ai/ai.module';
import { TransparencyModule } from './modules/ai/transparency/transparency.module';
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
    ThrottlerModule.forRoot([
      {
        ttl: Number(process.env.THROTTLE_TTL ?? 60) * 1000,
        limit: Number(process.env.THROTTLE_LIMIT ?? 20),
      },
    ]),

    // ── Módulos de domínio ───────────────────────────────────────────────────
    AiModule,
    TransparencyModule,
  ],
})
export class AppModule { }