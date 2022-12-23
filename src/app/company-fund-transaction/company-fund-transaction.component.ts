import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { PaymenttypeService } from '../services/paymenttype.service';
import { CompanyFundTransactionService } from '../services/company-fund-transaction.service';
import { PaymentType } from '../models/paymenttype';
import { CompanyFundTransaction } from '../models/company-fund-transaction';
import { LoginService } from '../services/login.service';
import { LogInIser } from '../models/loginuser';
import { Company } from '../models/company';
import { CompanyService } from '../services/company.service';
import { WindowRefService } from '../services/window-ref.service';
import { MerchantOrder } from '../models/merchantorder';
import { PaymentRequest } from '../models/paymentrequest';
import { CompleteOrderRequest } from '../models/completeorderrequest';

@Component({
  selector: 'app-company-fund-transaction',
  templateUrl: './company-fund-transaction.component.html',
  styleUrls: ['./company-fund-transaction.component.scss'],
  providers: [WindowRefService]
})
export class CompanyFundTransactionComponent implements OnInit {

  company: Company[] = [];
  paymentType: PaymentType[] = [];
  companyFundTransactions: CompanyFundTransaction[] = [];
  addForm: FormGroup;
  currentLoginUser: LogInIser;
  statusMessage: string = '';
  isSuccess: Boolean = false;
  isFail: Boolean = false;
  submitted = false;
  merchantOrder: MerchantOrder;
  paymentRequest: PaymentRequest;
  completeOrderRequest: CompleteOrderRequest;

  get formControls() { return this.addForm.controls; }

  constructor(public formBuilder: FormBuilder,
    private router: Router,
    public paymentService: PaymenttypeService,
    public apiService: CompanyFundTransactionService,
    public authenticationService: LoginService,
    public companyService: CompanyService,
    private winRef: WindowRefService
  ) { }

  ngOnInit() {
    this.currentLoginUser = this.authenticationService.currentUserValue;
    if (this.currentLoginUser === null || this.currentLoginUser === undefined) {
      this.router.navigate(['login']);
      return;
    }
    this.intialFormValue();
    this.getCompanyFundTransactionDetails();
    this.getPaymentType();
    this.getCompany();
  }

  intialFormValue() {
    this.addForm = this.formBuilder.group({
      companyFundTransactionId: [''],
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

  getCompanyFundTransactionDetails() {
    this.apiService.getCompanyFundTransaction()
      .subscribe(data => {
        this.companyFundTransactions = data;
      });
  }

  getPaymentType() {
    this.paymentService.getPaymentType()
      .subscribe(data => {
        this.paymentType = data;
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
    // this.addForm.value["companyFundTransactionId"] = 0;
    // this.addForm.value["createdBy"] = this.currentLoginUser.employeeId;
    // this.addForm.value["createdTime"] = new Date();
    this.apiService.ProcessPaymentRequest({
      amount: parseInt(this.addForm.value["amount"]),
      companyId: this.currentLoginUser.companyId,
      paymentTypeId: this.addForm.value["paymentTypeId"]
    })
      .subscribe(data => {
        this.payWithRazor(data);
      });
  }
  ProcesssResponse(data) {
    if (data.statusCode === 200) {
      this.getCompanyFundTransactionDetails();
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
  payWithRazor(merchantOrder: MerchantOrder) {
    const options: any = {
      key: merchantOrder.razorpayKey,
      amount: merchantOrder.amount,
      currency: merchantOrder.currency,
      name: merchantOrder.name,
      description: merchantOrder.description,
      image: './assets/logo.png',
      order_id: merchantOrder.orderId,
      modal: {
        // We should prevent closing of the form when esc key is pressed.
        escape: false,
      },
      notes: {
        // include notes if any
      },
      theme: {
        color: '#0c238a'
      }
    };
    options.handler = ((response, error) => {
      options.response = response;
      console.log(response);
      console.log(options);


      this.apiService.getPaymentStatus({
        companyId: this.currentLoginUser.companyId,
        createdBy: this.currentLoginUser.employeeId,
        createdTime: new Date(),
        orderId: response.razorpay_order_id,
        paymentId: response.razorpay_payment_id,
        paymentTypeId: parseInt(this.addForm.value["paymentTypeId"])
      })
        .subscribe(data => {
          console.log(data);
        });
      // call your backend api to verify payment signature & capture transaction
    });
    options.modal.ondismiss = (() => {
      // handle the case when user closes the form while transaction is in progress
      console.log('Transaction cancelled.');
    });
    const rzp = new this.winRef.nativeWindow.Razorpay(options);
    rzp.open();
  }

}