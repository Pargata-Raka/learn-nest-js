import { Injectable } from '@nestjs/common';
import { LoanQueryDto } from './dto/loans-query.dto.js';
import { LoanBodyDto } from './dto/loans-body.dto.js';

@Injectable()
export class LoansService {
  calculateInstallment(
    principal: number,
    query: LoanQueryDto,
    body: LoanBodyDto,
  ) {
    const { currency = 'IDR' } = query;
    const { months, annualInterestRate } = body;

    if (principal < 1000000 || principal > 1000000000) {
      return {
        success: false,
        message: 'Validation failed',
        errors: [
          {
            field: 'principal',
            message: 'principal must be between 1,000,000 and 1,000,000,000',
          },
        ],
      };
    }

    const validCurrencies = ['IDR', 'USD'];
    if (!validCurrencies.includes(currency.toUpperCase())) {
      return {
        success: false,
        message: 'Validation failed',
        errors: [
          {
            field: 'currency',
            message: 'currency must be either IDR or USD',
          },
        ],
      };
    }

    if (!Number.isInteger(months) || months < 1 || months > 60) {
      return {
        success: false,
        message: 'Validation failed',
        errors: [
          {
            field: 'months',
            message: 'months must be an integer between 1 and 60',
          },
        ],
      };
    }

    if (
      typeof annualInterestRate !== 'number' || annualInterestRate < 0 || annualInterestRate > 50
    ) {
      return {
        success: false,
        message: 'Validation failed',
        errors: [
          {
            field: 'annualInterestRate',
            message: 'annualInterestRate must be a number between 0 and 50',
          },
        ],
      };
    }

    const r = annualInterestRate / 12 / 100;
    
    let monthlyInstallment: number;
    if (r === 0) {
      monthlyInstallment = Math.round(principal / months);
    } else {
      const factor = Math.pow(1 + r, months);
      monthlyInstallment = Math.round(
        (principal * r * factor) / (factor - 1),
      );
    }

    const totalPayment = monthlyInstallment * months;
    const totalInterest = totalPayment - principal;

    return {
      success: true,
      message: 'Installment calculated',
      data: {
        principal,
        currency: currency.toUpperCase(),
        months,
        annualInterestRate,
        monthlyInterestRate: Number(r.toFixed(4)),
        monthlyInstallment,
        totalPayment,
        totalInterest,
      },
    };
  }
}