import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { CompanyService } from '../services/company.service';
import { EmployeeService } from '../services/employee.service';
import { EmployerFundDistributionService } from '../services/employer-fund-distribution.service';
import { Company } from '../models/company';
import { Employee } from '../models/employee';
import { LoginService } from '../services/login.service';
import { LogInIser } from '../models/loginuser';
@Component({
  selector: 'app-employer-fund-distribution',
  templateUrl: './employer-fund-distribution.component.html',
  styleUrls: ['./employer-fund-distribution.component.scss']
})
export class EmployerFundDistributionComponent implements OnInit {

  company: Company[] = [];
  employeeDetails: Employee[] = [];
  addForm: FormGroup;
  currentLoginUser: LogInIser;
  statusMessage: string = '';
  isSuccess: Boolean = false;
  isFail: Boolean = false;
  submitted = false;
  perkValue: string = '1';
  employeeName: string = '';
  totalAvailableFund: number = 0;
  employeeCount: number = 0;

  get formControls() { return this.addForm.controls; }

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    public companyService: CompanyService,
    public apiService: EmployeeService,
    public employeeTransactionService: EmployerFundDistributionService,
    public authenticationService: LoginService
  ) { }

  ngOnInit() {
    this.currentLoginUser = this.authenticationService.currentUserValue;
    if (this.currentLoginUser === null || this.currentLoginUser === undefined) {
      this.router.navigate(['login']);
      return;
    }
    this.intialFormValue();
    this.getCompany();
    this.getEmployees();

  }

  getEmployeeByType(event) {

  }
  bindEmployeeDetails(event, type) {
    let employee: Employee
    switch (type) {
      case 'name':
        employee = this.employeeDetails.find(t => t.employeeName.toLowerCase() === event.target.value.toLowerCase());
        break;
      case 'email':
        employee = this.employeeDetails.find(t => t.email.toLowerCase() === event.target.value.toLowerCase());
        break;
      case 'number':
        employee = this.employeeDetails.find(t => t.employeeNumber === parseInt(event.target.value));
        break;
      case 'employeeId':
        employee = this.employeeDetails.find(t => t.employeeId === parseInt(event.target.value));
        break;
      default:
        break;
    }
    if (employee != null) {
      this.addForm.setValue({
        employeeName: employee.employeeName,
        email: employee.email,
        employeeId: employee.employeeId,
        employeeNumber: employee.employeeNumber,
        comment: this.addForm.controls.comment.value,
        perkType: this.addForm.controls.perkType.value,
        perkValue: this.addForm.controls.perkValue.value,
      });
    }
    else {
      this.addForm.setValue({
        employeeName: '',
        email: '',
        employeeId: '',
        employeeNumber: '',
        comment: this.addForm.controls.comment.value,
        perkType: this.addForm.controls.perkType.value,
        perkValue: this.addForm.controls.perkValue.value,
      });
    }
  }

  perkTypeChange(event) {
    this.perkValue = event.target.value;
  }
  intialFormValue() {
    this.addForm = this.formBuilder.group({
      perkType: ['', Validators.required],
      employeeId: [''],
      employeeNumber: [''],
      employeeName: ['',],
      email: [''],
      comment: [''],
      perkValue: ['', Validators.required],
    });
  }

  getCompany() {
    this.companyService.getCompany()
      .subscribe(data => {
        this.company = data;
        let fundDetail = this.company.find(t => t.companyId === this.currentLoginUser.companyId);
        if (fundDetail != null) {
          this.totalAvailableFund = fundDetail.totalAvailableFund
        }
      });
  }

  getEmployees() {
    this.apiService.getEmployeeByCompany(this.currentLoginUser.companyId)
      .subscribe(data => {
        this.employeeDetails = data;
        this.employeeCount = data.length;
      });
  }

  onSubmit() {

    this.submitted = true;
    if (this.addForm.invalid) {
      return;
    }

    let enteredAmount = this.addForm.value["perkType"] == '1' ?
      parseInt(this.addForm.value["perkValue"]) : parseInt(this.addForm.value["perkValue"]) * this.employeeCount;

    if (this.totalAvailableFund < enteredAmount) {
      this.isFail = true;
      this.statusMessage = "Perk value shoud not be greater then available fund"
      this.ShowMessage();
      return;
    }

    if (this.addForm.value["perkType"] == '1' &&
      (this.addForm.value["employeeId"] == null ||
        this.addForm.value["employeeId"] == '' ||
        this.addForm.value["employeeId"] == undefined)) {
      this.isFail = true;
      this.statusMessage = "Please enter valid employee details"
      this.ShowMessage();
      return;
    }

    this.submitted = false;
    this.totalAvailableFund = this.totalAvailableFund - (this.addForm.value["perkType"] == '1' ? parseInt(this.addForm.value["perkValue"]) :
      parseInt(this.addForm.value["perkValue"]) * this.employeeCount);
    this.addForm.value['companyId'] = this.currentLoginUser.companyId;
    this.addForm.value['perkTypeIsIndividual'] = this.addForm.value["perkType"] == '1' ? true : false;
    this.addForm.value["createdBy"] = this.currentLoginUser.employeeId;
    this.addForm.value["employeeCount"] = this.employeeCount
    this.employeeTransactionService.addEmployeeFunds(this.addForm.value)
      .subscribe(
        data => {
          this.ProcesssResponse(data)
        });
  }

  ProcesssResponse(data) {
    if (data.statusCode === 200) {
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