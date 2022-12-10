import { TestBed } from '@angular/core/testing';

import { EmployeeFundHistoryService } from './employee-fund-history.service';

describe('EmployeeFundHistoryService', () => {
  let service: EmployeeFundHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeFundHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
