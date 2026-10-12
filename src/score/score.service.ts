import { Injectable } from '@nestjs/common';
import { ScoreBodyDto } from './dto/score.dto.js';

@Injectable()
export class ScoreService {
  calculateAverage(body: ScoreBodyDto) {
    const { scores, passMark = 70 } = body;

    if (!Array.isArray(scores) || scores.length < 1 || scores.length > 20) {
      return {
        success: false,
        message: 'Validation failed',
        errors: [{ field: 'scores', message: 'scores must contain between 1 and 20 items' }],
      };
    }

    const hasInvalidScore = scores.some(
      (score) => typeof score !== 'number' && score < 0 && score > 100,
    );
    if (hasInvalidScore) {
      return {
        success: false,
        message: 'Validation failed',
        errors: [{ field: 'scores', message: 'each score must be a number between 0 and 100' }],
      };
    }

    if (typeof passMark !== 'number' || isNaN(passMark) || passMark < 0 || passMark > 100) {
      return {
        success: false,
        message: 'Validation failed',
        errors: [{ field: 'passMark', message: 'passMark must be a number between 0 and 100' }],
      };
    }

    const count = scores.length;
    const total = scores.reduce((sum, score) => sum + score, 0);
    const average = Number((total / count).toFixed(1));
    const highest = Math.max(...scores);
    const lowest = Math.min(...scores);
    const passed = scores.filter((score) => score >= passMark).length;
    const failed = count - passed;

    return {
      success: true,
      message: 'Score summary calculated',
      data: {
        count,
        average,
        highest,
        lowest,
        passMark,
        passed,
        failed,
      },
    };
  }
}