import { TestBed } from '@angular/core/testing';

import { CatalogTypeService } from './catalog-type.service';

describe('CatalogTypeService', () => {
  let service: CatalogTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatalogTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
