import { Controller, Get, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TaxService } from './tax.service.js';
import { TaxQueryDto } from './dto/tax.dto.js';

@Controller('tax')
export class TaxController {
  constructor(private readonly taxService: TaxService) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  calculateTax(@Query() query: TaxQueryDto) {
    return this.taxService.calculateTax(query);
  }
}