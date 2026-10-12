import { Injectable } from '@nestjs/common';
import { TaxQueryDto } from './dto/tax.dto.js';

@Injectable()
export class TaxService {
  calculateTax(query: TaxQueryDto) {
    const { amount, rate } = query;
    const inclusive = query.inclusive === true || (query.inclusive as any) === 'true';

    let tax: number;
    let net: number;
    let gross: number;

    if (inclusive) {
      tax = Math.round((amount * rate) / (100 + rate));
      net = Math.round(amount - tax);
      gross = amount;
    } else {
      tax = Math.round((amount * rate) / 100);
      net = amount;
      gross = Math.round(amount + tax);
    }

    return {
      success: true,
      message: 'Tax calculated',
      data: {
        amount,
        rate,
        inclusive,
        tax,
        net,
        gross,
      },
    };
  }
}