import { TestBed } from '@angular/core/testing';

import { EmployerFundDistributionService } from './employer-fund-distribution.service';

describe('EmployeeTransactionService', () => {
  let service: EmployerFundDistributionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployerFundDistributionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
