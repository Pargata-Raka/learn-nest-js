import { Controller, Get, Param, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ParkingService } from './parking.service.js';
import { ParkingParamsDto } from './dto/parking-params.dto.js';
import { ParkingQueryDto } from './dto/parking-query.dto.js';

@Controller('parking')
export class ParkingController {
  constructor(private readonly parkingService: ParkingService) {}

  @Get(':hours')
  @UsePipes(new ValidationPipe({ transform: true }))
  calculateParkingFee(
    @Param() params: ParkingParamsDto,
    @Query() query: ParkingQueryDto,
  ) {
    return this.parkingService.calculateParkingFee(params.hours, query);
  }
}