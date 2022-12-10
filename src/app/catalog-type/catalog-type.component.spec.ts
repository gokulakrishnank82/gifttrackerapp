import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogTypeComponent } from './catalog-type.component';

describe('CatalogTypeComponent', () => {
  let component: CatalogTypeComponent;
  let fixture: ComponentFixture<CatalogTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
