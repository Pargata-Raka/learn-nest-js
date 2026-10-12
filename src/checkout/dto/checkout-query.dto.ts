import { Transform } from 'class-transformer';
import { IsOptional, IsBoolean, IsString } from 'class-validator';

export class CheckoutQueryDto {
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  member?: boolean = false;

  @IsOptional()
  @IsString()
  coupon?: string;
}