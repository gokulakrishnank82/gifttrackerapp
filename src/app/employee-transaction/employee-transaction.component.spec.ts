import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeTransactionComponent } from './employee-transaction.component';

describe('EmployeeTransactionComponent', () => {
  let component: EmployeeTransactionComponent;
  let fixture: ComponentFixture<EmployeeTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeTransactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
