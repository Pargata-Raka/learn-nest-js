import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ScoreService } from './score.service.js';
import { ScoreBodyDto } from './dto/score.dto.js';

@Controller('score')
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) {}

  @Post('average')
  @UsePipes(new ValidationPipe({ transform: true }))
  calculateAverage(@Body() body: ScoreBodyDto) {
    return this.scoreService.calculateAverage(body);
  }
}
