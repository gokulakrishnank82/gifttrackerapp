import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeBulkloadComponent } from './employee-bulkload.component';

describe('EmployeeBulkloadComponent', () => {
  let component: EmployeeBulkloadComponent;
  let fixture: ComponentFixture<EmployeeBulkloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeBulkloadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeBulkloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
