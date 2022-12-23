import { TestBed } from '@angular/core/testing';

import { EmployeeBulkloadService } from './employee-bulkload.service';

describe('EmployeeBulkloadService', () => {
  let service: EmployeeBulkloadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeBulkloadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
