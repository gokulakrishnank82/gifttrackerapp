import { TestBed } from '@angular/core/testing';

import { CompanycontactService } from './companycontact.service';

describe('CompanycontactService', () => {
  let service: CompanycontactService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanycontactService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
