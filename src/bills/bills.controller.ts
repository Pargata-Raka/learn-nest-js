import { Body, Controller, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { BillsService } from './bills.service.js';
import { BillSplitBodyDto } from './dto/bill-split-body.dto.js';
import { BillSplitParamsDto } from './dto/bill-split-params.dto.js';
import { ElectricityBillDto } from './dto/bill-electricity.dto.js';

@Controller('bills')
export class BillsController {
  constructor(private readonly billsService: BillsService) {}

  @Post(':peopleCount/split')
  @UsePipes(new ValidationPipe({ transform: true }))
  splitBill(
    @Param() params: BillSplitParamsDto,
    @Body() body: BillSplitBodyDto,
  ) {
    return this.billsService.splitBill(params.peopleCount, body);
  }
  @Post('electricity')
  @UsePipes(new ValidationPipe({ transform: true }))
  calculateElectricity(
    @Body() body: ElectricityBillDto) {
    return this.billsService.calculateElectricity(body);
  }
}
