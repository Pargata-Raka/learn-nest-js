import { Type, Transform } from 'class-transformer';
import { IsOptional, IsString, IsNumber, ValidateNested } from 'class-validator';

export class MeterDto {
  @IsOptional()
  @IsNumber()
  previousKwh: number;

  @IsOptional()
  @IsNumber()
  currentKwh: number;
}

export class RatesDto {
  @IsOptional()
  @IsNumber()
  baseFee: number;

  @IsOptional()
  @IsNumber()
  perKwh: number;

  @IsOptional()
  @IsNumber()
  taxRate?: number = 11;
}

export class ElectricityBillDto {
  @IsOptional()
  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  customerName: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => MeterDto)
  meter: MeterDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => RatesDto)
  rates: RatesDto;
}