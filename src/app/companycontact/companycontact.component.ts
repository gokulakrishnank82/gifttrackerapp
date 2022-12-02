import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { CompanycontactService } from '../services/companycontact.service';
import { CompanyContact } from '../models/companycontact';
import { LoginService } from '../services/login.service';
import { LogInIser } from '../models/loginuser';
import { Product } from '../models/product';
import { Company } from '../models/company';

@Component({
  selector: 'app-companycontact',
  templateUrl: './companycontact.component.html',
  styleUrls: ['./companycontact.component.scss']
})
export class CompanycontactComponent implements OnInit {

  companyContact: CompanyContact[] = [];
  companyDetails: Company[] = [];
  products: Product[] = [];
  addForm: FormGroup;
  isEdit: boolean = false;
  currentLoginUser: LogInIser;
  statusMessage: string = '';
  isSuccess: Boolean = false;
  isFail: Boolean = false;
  submitted = false;

  get formControls() { return this.addForm.controls; }

  constructor(public formBuilder: FormBuilder, private router: Router,
    public apiService: CompanycontactService,
    public authenticationService: LoginService
  ) { }

  ngOnInit() {
    this.currentLoginUser = this.authenticationService.currentUserValue;
    if (this.currentLoginUser === null || this.currentLoginUser === undefined) {
      this.router.navigate(['login']);
      return;
    }
    this.intialFormValue();
    this.getCompanyContact();
  }

  intialFormValue() {
    this.addForm = this.formBuilder.group({
      companyContactId: [''],
      companyId: ['', Validators.required],
      productId: ['', Validators.required],
      contactName: ['', Validators.required],
      email: ['', Validators.required],
      contactNumber: ['', Validators.required],
      alternateNumber: [''],
      createdBy: [''],
      createdTime: [''],
      modifiedBy: [''],
      modifiedTime: ['']
    });
  }

  reset() {
    this.submitted = false;
    this.addForm.reset();
  }

  getCompanyContact() {
    this.apiService.getAllContact()
      .subscribe(data => {
        console.log(data);
        this.companyContact = data.contact as CompanyContact[];
        this.products = data.product as Product[];
        this.companyDetails = data.company as Company[];
      });
  }

  deleteCompanyContact(companyContact: CompanyContact): void {
    this.apiService.deleteCompanyContact(companyContact.companyContactId)
      .subscribe(data => {
        this.isEdit = false;
        if (data.statusCode == 200) {
          this.companyContact = this.companyContact.filter(u => u !== companyContact);
          this.statusMessage = companyContact.contactName
          this.statusMessage = 'Contact Name: ' + companyContact.contactName + ' deleted successfully'
          this.isFail = true
          this.ShowMessage()
        }
        else {
          this.statusMessage = data.statusDescription
          this.isFail = true
        }
      })
  };

  editCompanyContact(companyContact: CompanyContact): void {
    this.intialFormValue();
    this.apiService.getCompanyContactById(+companyContact.companyContactId)
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

    if (this.isEdit == false) {
      this.addForm.value["companyContactId"] = 0;
      this.addForm.value["createdBy"] = this.currentLoginUser.employeeId;
      this.addForm.value["createdTime"] = new Date();
      this.apiService.createCompanyContact(this.addForm.value)
        .subscribe(data => {
          this.ProcesssResponse(data, '')
        });
    }
    else {
      this.addForm.value["modifiedBy"] = this.currentLoginUser.employeeId;
      this.addForm.value["modifiedTime"] = new Date();
      this.apiService.updateCompanyContact(this.addForm.value)
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
      this.getCompanyContact();
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
}
