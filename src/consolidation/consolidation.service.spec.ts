import { Test, TestingModule } from '@nestjs/testing';
import { ConsolidationService } from './consolidation.service';

describe('ConsolidationService', () => {
  let service: ConsolidationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConsolidationService],
    }).compile();

    service = module.get<ConsolidationService>(ConsolidationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
