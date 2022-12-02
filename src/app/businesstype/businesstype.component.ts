import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { BusinesstypeService } from '../services/businesstype.service';
import { BusinessType } from '../Models/businesstype';
import { LoginService } from '../services/login.service';
import { LogInIser } from '../models/loginuser';

@Component({
  selector: 'app-businesstype',
  templateUrl: './businesstype.component.html',
  styleUrls: ['./businesstype.component.scss']
})
export class BusinesstypeComponent implements OnInit {

  businessTypes: BusinessType[] = [];
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
    public apiService: BusinesstypeService,
    public authenticationService: LoginService) { }

  ngOnInit() {
    this.intialFormValue();
    this.currentLoginUser = this.authenticationService.currentUserValue;
    if (this.currentLoginUser === null || this.currentLoginUser === undefined) {
      this.router.navigate(['login']);
      return;
    }
    this.getBusinessType();
  }

  getBusinessType() {
    this.apiService.getBusinessType()
      .subscribe(data => {
        this.businessTypes = data;
      });
  }

  deleteBusinessType(businessType: BusinessType): void {
    this.apiService.deleteBusinessType(businessType.businessTypeId)
      .subscribe(data => {
        this.isEdit = false;
        if (data.statusCode == 200) {
          this.businessTypes = this.businessTypes.filter(u => u !== businessType);
          this.statusMessage = businessType.businessTypeName
          this.statusMessage = 'Business Type Name: ' + businessType.businessTypeName + ' deleted successfully'
          this.isFail = true
          this.ShowMessage()
        }
        else {
          this.statusMessage = data.statusDescription
          this.isFail = true
        }
      })
  };

  editBusinessType(businessType: BusinessType): void {
    this.intialFormValue();
    this.apiService.getBusinessTypeById(+businessType.businessTypeId)
      .subscribe(data => {
        this.addForm.setValue(data);
      });

    this.isEdit = true;
  };

  intialFormValue() {
    this.addForm = this.formBuilder.group({
      businessTypeId: [''],
      businessTypeName: ['', Validators.required],
      active: [true],
      createdBy: [''],
      createdTime: [''],
      modifiedBy: [''],
      modifiedTime: ['']
    });
  }

  onSubmit() {

    this.submitted = true;
    if (this.addForm.invalid) {
      return;
    }
    this.submitted = false;

    this.addForm.value['active'] = this.addForm.value["active"] ? true : false;
    if (this.isEdit == false) {
      this.addForm.value["businessTypeId"] = 0;
      this.addForm.value["createdBy"] = this.currentLoginUser.employeeId;
      this.addForm.value["createdTime"] = new Date();
      this.apiService.createBusinessType(this.addForm.value)
        .subscribe(data => {
          this.ProcesssResponse(data, '')
        });
    }
    else {
      this.addForm.value["modifiedBy"] = this.currentLoginUser.employeeId;
      this.addForm.value["modifiedTime"] = new Date();
      this.apiService.updateBusinessType(this.addForm.value)
        .subscribe(data => {
          this.ProcesssResponse(data, 'Edit')
        });
    }
  }
  ProcesssResponse(data, type) {
    if (data.statusCode === 200) {
      if (type === 'Edit')
        this.isEdit = false;
      this.getBusinessType();
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
    this.intialFormValue();
  }

}
