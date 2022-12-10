import { TestBed } from '@angular/core/testing';

import { CompanyFundTransactionService } from './company-fund-transaction.service';

describe('FundTransactionService', () => {
  let service: CompanyFundTransactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyFundTransactionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
