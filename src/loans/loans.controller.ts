import { Controller, Post, Param, Query, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { LoansService } from './loans.service.js';
import { LoanParamsDto } from './dto/loans-params.dto.js';
import { LoanQueryDto } from './dto/loans-query.dto.js';
import { LoanBodyDto } from './dto/loans-body.dto.js';

@Controller('loans')
export class LoansController {
  constructor(private readonly loansService: LoansService) {}

  @Post(':principal/installment')
  @UsePipes(new ValidationPipe({ transform: true }))
  calculateInstallment(
    @Param() params: LoanParamsDto,
    @Query() query: LoanQueryDto,
    @Body() body: LoanBodyDto,
  ) {
    return this.loansService.calculateInstallment(params.principal, query, body);
  }
}