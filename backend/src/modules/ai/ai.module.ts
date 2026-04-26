import { Module } from '@nestjs/common';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';
import { TransparencyService } from './transparency/transparency.service';

@Module({
  controllers: [AiController],
  providers: [AiService, TransparencyService],
  exports: [AiService],
})
export class AiModule {}
