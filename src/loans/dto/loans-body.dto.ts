import { IsOptional, IsNumber, IsInt } from 'class-validator';

export class LoanBodyDto {
  @IsOptional()
  @IsInt()
  months: number;

  @IsOptional()
  @IsNumber()
  annualInterestRate: number;
}