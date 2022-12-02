import { TestBed } from '@angular/core/testing';

import { FundTransactionService } from './fund-transaction.service';

describe('FundTransactionService', () => {
  let service: FundTransactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FundTransactionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
