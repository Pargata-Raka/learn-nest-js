import { Type } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";

export class TempParamsDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  value: number;
}