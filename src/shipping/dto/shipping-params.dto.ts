import { IsOptional, IsString } from 'class-validator';

export class ShippingParamsDto {
  @IsOptional()
  @IsString()
  city: string;
}