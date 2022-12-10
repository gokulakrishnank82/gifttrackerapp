import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeFundHistoryComponent } from './employee-fund-history.component';

describe('EmployeeFundHistoryComponent', () => {
  let component: EmployeeFundHistoryComponent;
  let fixture: ComponentFixture<EmployeeFundHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeFundHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeFundHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
