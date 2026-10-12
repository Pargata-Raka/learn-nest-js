import { Module } from '@nestjs/common';
import { ScoreService } from './score.service.js';
import { ScoreController } from './score.controller.js';

@Module({
  controllers: [ScoreController],
  providers: [ScoreService],
})
export class ScoreModule {}
