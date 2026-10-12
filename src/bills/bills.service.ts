import { Injectable } from '@nestjs/common';
import { BillSplitBodyDto } from './dto/bill-split-body.dto.js';
import { ElectricityBillDto } from './dto/bill-electricity.dto.js';

@Injectable()
export class BillsService {
  splitBill(peopleCount: number, body: BillSplitBodyDto) {
    const { items, tipPercent = 0 } = body;

    const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);

    const tip = Math.round((subtotal * tipPercent) / 100);
    const total = subtotal + tip;
    const perPerson = Math.round(total / peopleCount);

    return {
      success: true,
      message: 'Bill split',
      data: {
        peopleCount,
        subtotal,
        tipPercent,
        tip,
        total,
        perPerson,
      },
    };
  }
  
  calculateElectricity(body: ElectricityBillDto) {
    const { customerName, meter, rates } = body;

    if (
      !customerName || typeof customerName !== 'string' || customerName.length < 3 || customerName.length > 80
    ) {
      return {
        success: false,
        message: 'Validation failed',
        errors: [
          {
            field: 'customerName',
            message: 'customerName must be between 3 and 80 characters',
          },
        ],
      };
    }

    if (!meter || typeof meter !== 'object') {
      return {
        success: false,
        message: 'Validation failed',
        errors: [{ field: 'meter', message: 'meter object is required' }],
      };
    }

    const { previousKwh, currentKwh } = meter;
    if (typeof previousKwh !== 'number' || previousKwh < 0) {
      return {
        success: false,
        message: 'Validation failed',
        errors: [
          {
            field: 'meter.previousKwh',
            message: 'previousKwh must be a number greater than or equal to 0',
          },
        ],
      };
    }

    if (typeof currentKwh !== 'number' || currentKwh <= previousKwh) {
      return {
        success: false,
        message: 'Validation failed',
        errors: [
          {
            field: 'meter.currentKwh',
            message: 'currentKwh must be greater than previousKwh',
          },
        ],
      };
    }

    if (!rates || typeof rates !== 'object') {
      return {
        success: false,
        message: 'Validation failed',
        errors: [{ field: 'rates', message: 'rates object is required' }],
      };
    }

    const { baseFee, perKwh, taxRate = 11 } = rates;
    if (typeof baseFee !== 'number' || baseFee < 0) {
      return {
        success: false,
        message: 'Validation failed',
        errors: [
          {
            field: 'rates.baseFee',
            message: 'baseFee must be a number greater than or equal to 0',
          },
        ],
      };
    }

    if (typeof perKwh !== 'number' || perKwh < 0) {
      return {
        success: false,
        message: 'Validation failed',
        errors: [
          {
            field: 'rates.perKwh',
            message: 'perKwh must be a number greater than or equal to 0',
          },
        ],
      };
    }

    if (typeof taxRate !== 'number' || taxRate < 0 || taxRate > 20) {
      return {
        success: false,
        message: 'Validation failed',
        errors: [
          {
            field: 'rates.taxRate',
            message: 'taxRate must be a number between 0 and 20',
          },
        ],
      };
    }
    const usageKwh = currentKwh - previousKwh;
    const usageFee = usageKwh * perKwh;
    const subtotal = baseFee + usageFee;
    const tax = Math.round((subtotal * taxRate) / 100);
    const total = subtotal + tax;
    
    return {
      success: true,
      message: 'Electricity bill calculated',
      data: {
        customerName,
        usageKwh,
        baseFee,
        usageFee,
        subtotal,
        taxRate,
        tax,
        total,
      },
    }
  }
}