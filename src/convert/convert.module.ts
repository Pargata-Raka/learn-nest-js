import { Module } from '@nestjs/common';
import { ConvertService } from './convert.service.js';
import { ConvertController } from './convert.controller.js';

@Module({
  controllers: [ConvertController],
  providers: [ConvertService],
})
export class ConvertModule {}
