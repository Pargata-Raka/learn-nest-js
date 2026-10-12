import { Type } from 'class-transformer';
import { IsArray, IsString, IsNumber, IsInt, IsOptional, ValidateNested } from 'class-validator';

export class CheckoutItemDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsInt()
  qty: number;
}

export class CheckoutBodyDto {
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CheckoutItemDto)
  items: CheckoutItemDto[];
}