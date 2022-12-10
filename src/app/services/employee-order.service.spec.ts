import { TestBed } from '@angular/core/testing';

import { EmployeeOrderService } from './employee-order.service';

describe('EmployeeOrderService', () => {
  let service: EmployeeOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
