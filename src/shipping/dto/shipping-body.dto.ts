import { Type } from 'class-transformer';
import { IsOptional, IsNumber, ValidateNested } from 'class-validator';

export class DimensionDto {
  @IsOptional()
  @IsNumber()
  lengthCm: number;

  @IsOptional()
  @IsNumber()
  widthCm: number;

  @IsOptional()
  @IsNumber()
  heightCm: number;
}

export class ShippingBodyDto {
  @IsOptional()
  @IsNumber()
  weightKg: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => DimensionDto)
  dimension: DimensionDto;
}