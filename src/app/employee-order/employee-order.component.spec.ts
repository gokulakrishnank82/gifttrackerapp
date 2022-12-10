import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeOrderComponent } from './employee-order.component';

describe('EmployeeOrderComponent', () => {
  let component: EmployeeOrderComponent;
  let fixture: ComponentFixture<EmployeeOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
