import { IsOptional, IsString } from 'class-validator';

export class LoanQueryDto {
  @IsOptional()
  @IsString()
  currency?: string = 'IDR';
}