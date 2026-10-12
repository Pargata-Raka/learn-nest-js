import { Transform, Type } from "class-transformer";
import { IsBoolean, IsNumber, IsOptional, Max, Min } from "class-validator";

export class TaxQueryDto {
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  amount: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  @Type(() => Number)
  rate: number;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')  inclusive?: boolean = false;
}