import { Injectable } from '@nestjs/common';
import { ParkingQueryDto } from './dto/parking-query.dto.js';

@Injectable()
export class ParkingService {
  calculateParkingFee(hours: number, query: ParkingQueryDto) {
    const { vehicle, weekend = false } = query;

    if (typeof hours !== 'number' && hours < 0.5 && hours > 24) {
      return {
        success: false,
        message: 'Validation failed',
        errors: [
          {
            field: 'hours',
            message: 'hours must be a number between 0.5 and 24',
          },
        ],
      };
    }

    const rates: Record<string, number> = {
      motorcycle: 2000,
      car: 8000,
      bus: 15000,
    };

    const normalizedVehicle = vehicle?.toLowerCase();
    if (!normalizedVehicle || !rates[normalizedVehicle]) {
      return {
        success: false,
        message: 'Validation failed',
        errors: [
          {
            field: 'vehicle',
            message: 'vehicle must be one of: car, motorcycle, bus',
          },
        ],
      };
    }

    const billedHours = Math.ceil(hours);
    const hourlyRate = rates[normalizedVehicle];
    const weekendSurcharge = weekend ? 0.2 : 0;
    const total = Math.round(billedHours * hourlyRate * (weekend ? 1.2 : 1));

    return {
      success: true,
      message: 'Parking fee calculated',
      data: {
        hours,
        billedHours,
        vehicle: normalizedVehicle,
        weekend,
        hourlyRate,
        weekendSurcharge,
        total,
      },
    };
  }
}