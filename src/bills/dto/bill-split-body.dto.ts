import { Transform, Type } from "class-transformer";
import { ArrayMaxSize, ArrayMinSize, IsArray, IsInt, IsNumber, IsOptional, IsString, Length, Max, Min, ValidateNested } from "class-validator";

export class BillItemDto {
  @IsString()
  @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
  @Length(2, 50, { message: 'name must be between 2 and 50 characters' })
  name: string;

  @IsNumber({}, { message: 'price must be a number' })
  @Min(0, { message: 'price must be at least 0' })
  price: number;

  @IsInt({ message: 'qty must be an integer' })
  @Min(1, { message: 'qty must be at least 1' })
  qty: number;
}

export class BillSplitBodyDto {
  @IsArray()
  @ArrayMinSize(1, { message: 'items must contain at least 1 item' })
  @ArrayMaxSize(30, { message: 'items must not exceed 30 items' })
  @ValidateNested({ each: true })
  @Type(() => BillItemDto)
  items: BillItemDto[];

  @IsOptional()
  @IsNumber({}, { message: 'tipPercent must be a number' })
  @Min(0, { message: 'tipPercent must be at least 0' })
  @Max(30, { message: 'tipPercent must not exceed 30' })
  tipPercent?: number = 0;
}