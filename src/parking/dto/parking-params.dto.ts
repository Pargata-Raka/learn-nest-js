import { Type } from 'class-transformer';
import { IsOptional, IsNumber } from 'class-validator';

export class ParkingParamsDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  hours: number;
}