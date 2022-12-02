import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { CompanyService } from '../services/company.service';
import { BusinesstypeService } from '../services/businesstype.service';
import { Company } from '../models/company';
import { BusinessType } from '../models/businesstype';
import { LoginService } from '../services/login.service';
import { LogInIser } from '../models/loginuser';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  companyDetails: Company[] = [];
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
    public apiService: CompanyService,
    public businessTypeServie: BusinesstypeService,
    public authenticationService: LoginService
  ) { }

  ngOnInit() {
    this.currentLoginUser = this.authenticationService.currentUserValue;
    if (this.currentLoginUser === null || this.currentLoginUser === undefined) {
      this.router.navigate(['login']);
      return;
    }
    this.intialFormValue();
    this.getBusinessType();
    this.getCompany();
  }

  intialFormValue() {
    this.addForm = this.formBuilder.group({
      companyId: [''],
      companyName: ['', Validators.required],
      address: [''],
      email: ['', Validators.required],
      contactNumber: ['', Validators.required],
      website: [''],
      businessTypeId: ['', Validators.required],
      totalAvailableFund: [0],
      active: [true],
      createdBy: [''],
      createdTime: [''],
      modifiedBy: [''],
      modifiedTime: ['']
    });
  }

  getBusinessType() {
    this.businessTypeServie.getBusinessType().subscribe
      (
        (response) => {
          this.businessTypes = response;
        },
        (error) => console.log(error)
      );
  }

  getCompany() {
    this.apiService.getCompany()
      .subscribe(data => {
        this.companyDetails = data;
      });
  }

  deleteCompany(company: Company): void {
    this.apiService.deleteCompany(company.companyId)
      .subscribe(data => {
        this.isEdit = false;
        if (data.statusCode == 200) {
          this.companyDetails = this.companyDetails.filter(u => u !== company);
          this.statusMessage = company.companyName
          this.statusMessage = 'Company Name: ' + company.companyName + ' deleted successfully'
          this.isFail = true
          this.ShowMessage()
        }
        else {
          this.statusMessage = data.statusDescription
          this.isFail = true
        }
      })
  };

  editCompany(Company: Company): void {
    this.intialFormValue();
    this.apiService.getCompanyById(+Company.companyId)
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
      this.addForm.value["createdBy"] = this.currentLoginUser.employeeId;
      this.addForm.value["createdTime"] = new Date();
      this.addForm.value["companyId"] = 0;
      this.apiService.createCompany(this.addForm.value)
        .subscribe(data => {
          this.ProcesssResponse(data, '')
        });
    }
    else {
      this.addForm.value["modifiedBy"] = this.currentLoginUser.employeeId;
      this.addForm.value["modifiedTime"] = new Date();
      this.apiService.updateCompany(this.addForm.value)
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
      this.getCompany();
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
