import { Module } from '@nestjs/common';
import { ParkingService } from './parking.service.js';
import { ParkingController } from './parking.controller.js';

@Module({
  controllers: [ParkingController],
  providers: [ParkingService],
})
export class ParkingModule {}
