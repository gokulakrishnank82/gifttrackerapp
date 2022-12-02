import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { PaymenttypeService } from '../services/paymenttype.service';
import { PaymentType } from '../models/paymenttype';
import { LoginService } from '../services/login.service';
import { LogInIser } from '../models/loginuser';

@Component({
  selector: 'app-paymenttype',
  templateUrl: './paymenttype.component.html',
  styleUrls: ['./paymenttype.component.scss']
})
export class PaymenttypeComponent implements OnInit {

  paymentTypeDetails: PaymentType[] = [];
  addForm: FormGroup;
  isEdit: boolean = false;
  currentLoginUser: LogInIser;
  statusMessage: string = '';
  isSuccess: Boolean = false;
  isFail: Boolean = false;
  submitted = false;

  get formControls() { return this.addForm.controls; }

  constructor(public formBuilder: FormBuilder,
    private router: Router,
    public apiService: PaymenttypeService,
    public authenticationService: LoginService) { }

  ngOnInit() {
    this.currentLoginUser = this.authenticationService.currentUserValue;
    if (this.currentLoginUser === null || this.currentLoginUser === undefined) {
      this.router.navigate(['login']);
      return;
    }
    this.intialFormValue();
    this.getPaymentTypeDetails();
  }

  intialFormValue() {
    this.addForm = this.formBuilder.group({
      paymentTypeId: [''],
      paymentTypeName: ['', Validators.required],
      active: [true],
      createdBy: [''],
      createdTime: [''],
      modifiedBy: [''],
      modifiedTime: ['']
    });
  }

  getPaymentTypeDetails() {
    this.apiService.getPaymentType()
      .subscribe(data => {
        this.paymentTypeDetails = data;
        console.log(data);
      });
  }

  deletePaymentType(paymentType: PaymentType): void {
    this.apiService.deletePaymentType(paymentType.paymentTypeId)
      .subscribe(data => {
        this.isEdit = false;
        if (data.statusCode == 200) {
          this.paymentTypeDetails = this.paymentTypeDetails.filter(u => u !== paymentType);
          this.statusMessage = paymentType.paymentTypeName
          this.statusMessage = 'Payment Type: ' + paymentType.paymentTypeName + ' deleted successfully'
          this.isFail = true
          this.ShowMessage()
        }
        else {
          this.statusMessage = data.statusDescription
          this.isFail = true
        }
      })
  };

  editPaymentType(paymentType: PaymentType): void {
    this.intialFormValue();
    this.apiService.getPaymentTypeById(+paymentType.paymentTypeId)
      .subscribe(data => {
        this.addForm.setValue(data);
      });

    this.isEdit = true;
  };
  

  onSubmit() {

    this.submitted = true;
    if (this.addForm.invalid) {
      return;
    }
    this.submitted = false;

    this.addForm.value['active'] = this.addForm.value["active"] ? true : false;
    
    if (this.isEdit == false) {
      this.addForm.value["paymentTypeId"] = 0;
      this.addForm.value["createdBy"] = this.currentLoginUser.employeeId;
      this.addForm.value["createdTime"] = new Date();
      this.apiService.createPaymentType(this.addForm.value)
        .subscribe(data => {
          this.ProcesssResponse(data, '')
        });
    }
    else {
      this.addForm.value["modifiedBy"] = this.currentLoginUser.employeeId;
      this.addForm.value["modifiedTime"] = new Date();
      this.apiService.updatePaymentType(this.addForm.value)
        .subscribe(
          data => {
            this.ProcesssResponse(data, 'Edit')
          });
    }
  }
  ProcesssResponse(data, type) {
    if (data.statusCode === 200) {
      if (type === 'Edit')
        this.isEdit = false;
      this.getPaymentTypeDetails();
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

  reset() {
    this.submitted = false;
    this.addForm.reset();
  }


}
