import { Injectable } from '@nestjs/common';
import { lengthDto } from './dto/convert.dto.js';
import { TempQueryDto } from './dto/temp-query.dto.js';

@Injectable()
export class ConvertService {
    getLength(m:lengthDto) {
        return {
            success: true,
            message: 'Converted successfully',
            data: {
                meter: m.meters,
                kilometer: m.meters / 1000,
                centimeter: m.meters * 100,
                miles: Number((m.meters * 0.00062137).toFixed(3))
             }
        }
    }
  convertTemperature(value: number, query: TempQueryDto) {
    const validUnits = ['C', 'F', 'K'];
    const from = query.from?.toUpperCase();
    const to = query.to?.toUpperCase();

    if (typeof value !== 'number' || value < -273.15 || value > 1000) {
      return {
        success: false,
        message: 'Validation failed',
        errors: [{ field: 'value', message: 'value must be a number between -273.15 and 1000' }],
      };
    }

    if (!from || !validUnits.includes(from)) {
      return {
        success: false,
        message: `Unit '${query.from}' is not supported`,
        errors: [],
      };
    }

    if (!to || !validUnits.includes(to)) {
      return {
        success: false,
        message: `Unit '${query.to}' is not supported`,
        errors: [],
      };
    }

    if (from === to) {
      return {
        success: false,
        message: "Target unit 'to' must be different from 'from'",
        errors: [],
      };
    }

    let celsius: number = value;
    if (from === 'F') celsius = ((value - 32) * 5) / 9;
    if (from === 'K') celsius = value - 273.15;

    let result: number = celsius;
    if (to === 'F') result = (celsius * 9) / 5 + 32;
    if (to === 'K') result = celsius + 273.15;

    return {
      success: true,
      message: 'Temperature converted',
      data: {
        value,
        from,
        to,
        result: Number(result.toFixed(2)),
      },
    };
  }
}
