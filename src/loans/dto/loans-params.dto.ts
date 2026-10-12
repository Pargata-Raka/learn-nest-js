import { Type } from 'class-transformer';
import { IsOptional, IsNumber } from 'class-validator';

export class LoanParamsDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  principal: number;
}