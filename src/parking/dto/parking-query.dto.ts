import { Transform } from 'class-transformer';
import { IsOptional, IsString, IsBoolean } from 'class-validator';

export class ParkingQueryDto {
  @IsOptional()
  @IsString()
  vehicle: string;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  weekend?: boolean = false;
}