import { Test, TestingModule } from '@nestjs/testing';
import { TaxController } from './tax.controller.js';
import { TaxService } from './tax.service.js';

describe('TaxController', () => {
  let controller: TaxController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaxController],
      providers: [TaxService],
    }).compile();

    controller = module.get<TaxController>(TaxController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
