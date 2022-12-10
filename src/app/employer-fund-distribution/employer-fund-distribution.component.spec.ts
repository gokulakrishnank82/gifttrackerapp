import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerFundDistributionComponent } from './employer-fund-distribution.component';

describe('EmployeeTransactionComponent', () => {
  let component: EmployerFundDistributionComponent;
  let fixture: ComponentFixture<EmployerFundDistributionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployerFundDistributionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployerFundDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
