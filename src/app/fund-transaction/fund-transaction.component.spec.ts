import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundTransactionComponent } from './fund-transaction.component';

describe('FundTransactionComponent', () => {
  let component: FundTransactionComponent;
  let fixture: ComponentFixture<FundTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FundTransactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FundTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
