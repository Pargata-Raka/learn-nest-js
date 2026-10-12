import { Injectable, NotFoundException } from '@nestjs/common';
import { CheckoutQueryDto } from './dto/checkout-query.dto.js';
import { CheckoutBodyDto } from './dto/checkout-body.dto.js';

@Injectable()
export class CheckoutService {
  calculateDiscount(query: CheckoutQueryDto, body: CheckoutBodyDto) {
    const { member = false, coupon } = query;
    const { items } = body;

    if (!Array.isArray(items) || items.length < 1 || items.length > 20) {
      return {
        success: false,
        message: 'Validation failed',
        errors: [{ field: 'items', message: 'items must contain between 1 and 20 items' }],
      };
    }

    for (const item of items) {
      if (!item.name || item.name.length < 2 || item.name.length > 50) {
        return {
          success: false,
          message: 'Validation failed',
          errors: [{ field: 'items.name', message: 'item name must be between 2 and 50 characters' }],
        };
      }
      if (typeof item.price !== 'number' || item.price < 0) {
        return {
          success: false,
          message: 'Validation failed',
          errors: [{ field: 'items.price', message: 'price must be a number greater than or equal to 0' }],
        };
      }
      if (!Number.isInteger(item.qty) || item.qty < 1) {
        return {
          success: false,
          message: 'Validation failed',
          errors: [{ field: 'items.qty', message: 'qty must be an integer of at least 1' }],
        };
      }
    }

    const validCoupons = ['HEMAT10', 'HEMAT20', 'FREESHIP'];
    if (coupon && !validCoupons.includes(coupon)) {
      throw new NotFoundException({
        statusCode: 404,
        message: `Coupon '${coupon}' not found`,
        error: 'Not Found',
      });
    }

    const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);

    const memberDiscount = member ? Math.round(subtotal * 0.05) : 0;

    let couponDiscount = 0;
    if (coupon === 'HEMAT10') {
      couponDiscount = Math.round(subtotal * 0.1);
    } else if (coupon === 'HEMAT20') {
      couponDiscount = Math.round(subtotal * 0.2);
    } else if (coupon === 'FREESHIP') {
      couponDiscount = 0;
    }

    const totalDiscount = memberDiscount + couponDiscount;
    const grandTotal = subtotal - totalDiscount;

    return {
      success: true,
      message: 'Checkout calculated',
      data: {
        subtotal,
        member,
        coupon: coupon || null,
        discounts: {
          member: memberDiscount,
          coupon: couponDiscount,
          total: totalDiscount,
        },
        grandTotal,
      },
    };
  }
}