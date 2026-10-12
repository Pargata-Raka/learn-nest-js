import { Controller, Post, Query, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { CheckoutService } from './checkout.service.js';
import { CheckoutQueryDto } from './dto/checkout-query.dto.js';
import { CheckoutBodyDto } from './dto/checkout-body.dto.js';

@Controller('checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Post('discount')
  @UsePipes(new ValidationPipe({ transform: true }))
  calculateDiscount(
    @Query() query: CheckoutQueryDto,
    @Body() body: CheckoutBodyDto,
  ) {
    return this.checkoutService.calculateDiscount(query, body);
  }
}