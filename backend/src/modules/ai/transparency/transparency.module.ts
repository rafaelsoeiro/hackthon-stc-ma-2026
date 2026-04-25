import { Module } from '@nestjs/common';
import { TransparencyService } from './transparency.service';

@Module({
  providers: [TransparencyService],
  exports: [TransparencyService],
})
export class TransparencyModule {}
