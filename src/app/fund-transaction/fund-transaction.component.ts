import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { PaymenttypeService } from '../services/paymenttype.service';
import { FundTransactionService } from '../services/fund-transaction.service';
import { PaymentType } from '../models/paymenttype';
import { FundTransaction } from '../models/fundtransaction';
import { LoginService } from '../services/login.service';
import { LogInIser } from '../models/loginuser';
import { Company } from '../models/company';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-fund-transaction',
  templateUrl: './fund-transaction.component.html',
  styleUrls: ['./fund-transaction.component.scss']
})
export class FundTransactionComponent implements OnInit {

  company: Company[] = [];
  paymentType: PaymentType[] = [];
  fundTransactionHistory: FundTransaction[] = [];
  addForm: FormGroup;
  currentLoginUser: LogInIser;
  statusMessage: string = '';
  isSuccess: Boolean = false;
  isFail: Boolean = false;
  submitted = false;

  get formControls() { return this.addForm.controls; }

  constructor(public formBuilder: FormBuilder,
    private router: Router,
    public paymentService: PaymenttypeService,
    public apiService: FundTransactionService,
    public authenticationService: LoginService,
    public companyService: CompanyService,
  ) { }

  ngOnInit() {
    this.currentLoginUser = this.authenticationService.currentUserValue;
    if (this.currentLoginUser === null || this.currentLoginUser === undefined) {
      this.router.navigate(['login']);
      return;
    }
    this.intialFormValue();
    this.getFundTransactionHistory();
    this.getPaymentType();
    this.getCompany();
  }

  intialFormValue() {
    this.addForm = this.formBuilder.group({
      fundTransactionHistoryId: [''],
      companyId: [''],
      amount: ['', Validators.required],
      paymentTypeId: ['', Validators.required],
      createdBy: [''],
      createdTime: [''],
      modifiedBy: [''],
      modifiedTime: ['']
    });
    if (this.currentLoginUser.role === "Super Admin")
      this.addForm.get('companyId').setValidators(Validators.required)
  }

  getCompany() {
    this.companyService.getCompany()
      .subscribe(data => {
        this.company = data;
      });
  }

  getFundTransactionHistory() {
    this.apiService.getFundTransactionHistory()
      .subscribe(data => {
        this.fundTransactionHistory = data;
        console.log(data);
      });
  }

  getPaymentType() {
    this.paymentService.getPaymentType()
      .subscribe(data => {
        this.paymentType = data;
        console.log(data);
      });
  }

  onSubmit() {

    this.submitted = true;
    if (this.currentLoginUser.role != "Super Admin")
      this.addForm.value['companyId'] = this.currentLoginUser.companyId
    
    if (this.addForm.invalid) {
      return;
    }
    this.submitted = false;
    this.addForm.value["fundTransactionHistoryId"] = 0;
    this.addForm.value["createdBy"] = this.currentLoginUser.employeeId;
    this.addForm.value["createdTime"] = new Date();
    this.apiService.createFundTransactionHistory(this.addForm.value)
      .subscribe(data => {
        this.ProcesssResponse(data)
      });
  }
  ProcesssResponse(data) {
    if (data.statusCode === 200) {
      this.getFundTransactionHistory();
      this.addForm.reset();
      this.isSuccess = true;
      this.intialFormValue();
    } else {
      this.isFail = true;
    }
    this.statusMessage = data.statusDescription
    this.ShowMessage();
  }

  ShowMessage() {
    setTimeout(function () {
      this.isSuccess = false;
      this.isFail = false;
    }.bind(this), 3000);
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  reset() {
    this.submitted = false;
    this.addForm.reset();
  }

}