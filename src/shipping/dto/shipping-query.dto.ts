import { Transform } from 'class-transformer';
import { IsOptional, IsBoolean } from 'class-validator';

export class ShippingQueryDto {
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  express?: boolean = false;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  insurance?: boolean = false;
}