import { Controller, Get, Param, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ConvertService } from './convert.service.js';
import { lengthDto } from './dto/convert.dto.js';
import { TempParamsDto } from './dto/temp-params.dto.js';
import { TempQueryDto } from './dto/temp-query.dto.js';

@Controller('convert')
export class ConvertController {
  constructor(private readonly convertService: ConvertService) {}

  @Get('length/:meters')
  @UsePipes(new ValidationPipe({ transform: true }))
  getLength(@Param() params: lengthDto) {
    return this.convertService.getLength(params);
  }

  @Get('temperature/:value')
  @UsePipes(new ValidationPipe({ transform: true }))
  convertTemperature(
    @Param() params: TempParamsDto,
    @Query() query: TempQueryDto,
  ) {
    return this.convertService.convertTemperature(params.value, query);
  }
}