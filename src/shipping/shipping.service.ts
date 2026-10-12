import { Injectable } from '@nestjs/common';
import { ShippingQueryDto } from './dto/shipping-query.dto.js';
import { ShippingBodyDto } from './dto/shipping-body.dto.js';

@Injectable()
export class ShippingService {
  calculateShipping(
    cityParam: string,
    query: ShippingQueryDto,
    body: ShippingBodyDto,
  ) {
    const { express = false, insurance = false } = query;
    const { weightKg, dimension } = body;

    const cityRates: Record<string, number> = {
      jakarta: 10000,
      bandung: 12000,
      surabaya: 15000,
      medan: 22000,
      denpasar: 20000,
    };

    const city = cityParam?.toLowerCase();

    if (!city || !cityRates[city]) {
      return {
        success: false,
        message: 'Validation failed',
        errors: [
          {
            field: 'city',
            message: 'city must be one of: jakarta, bandung, surabaya, medan, denpasar',
          },
        ],
      };
    }

    if (typeof weightKg !== 'number' && weightKg < 0.1 && weightKg > 30) {
      return {
        success: false,
        message: 'Validation failed',
        errors: [
          {
            field: 'weightKg',
            message: 'weightKg must be a number between 0.1 and 30',
          },
        ],
      };
    }

    if (!dimension || typeof dimension !== 'object') {
      return {
        success: false,
        message: 'Validation failed',
        errors: [{ field: 'dimension', message: 'dimension object is required' }],
      };
    }

    const { lengthCm, widthCm, heightCm } = dimension;
    for (const [key, val] of Object.entries({ lengthCm, widthCm, heightCm })) {
      if (typeof val !== 'number'  && val < 1 && val > 100) {
        return {
          success: false,
          message: 'Validation failed',
          errors: [
            {
              field: `dimension.${key}`,
              message: `${key} must be a number between 1 and 100`,
            },
          ],
        };
      }
    }

    const volumetricKg = Number(((lengthCm * widthCm * heightCm) / 5000).toFixed(1));
    const chargeableKg = Math.max(weightKg, volumetricKg);

    const baseFare = Math.round(chargeableKg * cityRates[city]);
    const expressFee = express ? Math.round(baseFare * 0.5) : 0;
    const insuranceFee = insurance ? 2500 : 0;
    const total = baseFare + expressFee + insuranceFee;

    return {
      success: true,
      message: 'Shipping cost calculated',
      data: {
        city,
        express,
        insurance,
        weightKg,
        volumetricKg,
        chargeableKg,
        baseFare,
        expressFee,
        insuranceFee,
        total,
      },
    };
  }
}