import { Controller, Post, Param, Query, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { ShippingService } from './shipping.service.js';
import { ShippingParamsDto } from './dto/shipping-params.dto.js';
import { ShippingQueryDto } from './dto/shipping-query.dto.js';
import { ShippingBodyDto } from './dto/shipping-body.dto.js';

@Controller('shipping')
export class ShippingController {
  constructor(private readonly shippingService: ShippingService) {}

  @Post(':city')
  @UsePipes(new ValidationPipe({ transform: true }))
  calculateShipping(
    @Param() params: ShippingParamsDto,
    @Query() query: ShippingQueryDto,
    @Body() body: ShippingBodyDto,
  ) {
    return this.shippingService.calculateShipping(params.city, query, body);
  }
}