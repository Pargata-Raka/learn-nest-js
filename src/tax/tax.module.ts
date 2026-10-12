import { Module } from '@nestjs/common';
import { TaxService } from './tax.service.js';
import { TaxController } from './tax.controller.js';

@Module({
  controllers: [TaxController],
  providers: [TaxService],
})
export class TaxModule {}
