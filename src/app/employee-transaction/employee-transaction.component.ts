import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { RoleService } from '../services/role.service';
import { CompanyService } from '../services/company.service';
import { EmployeeService } from '../services/employee.service';
import { Role } from '../models/role';
import { Company } from '../models/company';
import { Employee } from '../models/employee';
import { LoginService } from '../services/login.service';
import { LogInIser } from '../models/loginuser';
@Component({
  selector: 'app-employee-transaction',
  templateUrl: './employee-transaction.component.html',
  styleUrls: ['./employee-transaction.component.scss']
})
export class EmployeeTransactionComponent implements OnInit {
  roles: Role[] = [];
  company: Company[] = [];
  employeeDetails: Employee[] = [];
  addForm: FormGroup;
  isEdit: boolean = false;
  currentLoginUser: LogInIser;
  statusMessage: string = '';
  isSuccess: Boolean = false;
  isFail: Boolean = false;
  submitted = false;

  get formControls() { return this.addForm.controls; }
  
  constructor(public formBuilder: FormBuilder, private router: Router,
    public companyService: CompanyService,
    public roleService: RoleService,
    public apiService: EmployeeService,
    public authenticationService: LoginService
  ) { }

  ngOnInit() {
    // this.currentLoginUser = this.authenticationService.currentUserValue;
    // if (this.currentLoginUser === null || this.currentLoginUser === undefined) {
    //   this.router.navigate(['login']);
    //   return;
    // }
    this.intialFormValue();
    this.getCompany();
    this.getRole();
    this.getEmployees();
  }

  intialFormValue() {
    this.addForm = this.formBuilder.group({
      employeeId: [''],
      employeeNumber: ['', Validators.required],
      employeeName: ['', Validators.required],
      email: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      companyId: ['', Validators.required],
      password: [''],
      designation: [''],
      isPasswordChange: [''],
      roleId: ['', Validators.required],
      moneyBalance: [''],
      perkValue: [''],
      active: [true],
      createdBy: [''],
      createdTime: [''],
      modifiedBy: [''],
      modifiedTime: ['']
    });
  }

  getCompany() {
    this.companyService.getCompany()
      .subscribe(data => {
        this.company = data;
        console.log(data);
      });
  }

  getRole() {
    this.roleService.getRole()
      .subscribe(data => {
        this.roles = data;
        console.log(data);
      });
  }

  getEmployees() {
    this.apiService.getEmployee()
      .subscribe(data => {
        this.employeeDetails = data;
        console.log(data);
      });
  }

  deleteEmployee(employee: Employee): void {
    this.apiService.deleteEmployee(employee.employeeId)
      .subscribe(data => {
        this.isEdit = false;
        if (data.statusCode == 200) {
          this.employeeDetails = this.employeeDetails.filter(u => u !== employee);
          this.statusMessage = 'Employee Name: ' + employee.employeeName + 'deleted successfully'
          this.isFail = true
          this.ShowMessage()
        }
      })
  };

  editEmployee(employee: Employee): void {
    this.intialFormValue()
    this.apiService.getEmployeeById(+employee.employeeId)
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
      this.addForm.value["employeeId"] = 0;
      this.addForm.value["isPasswordChange"] = 1;
      this.addForm.value["createdBy"] = this.currentLoginUser.employeeId;
      this.addForm.value["createdTime"] = new Date();
      this.apiService.createEmployee(this.addForm.value)
        .subscribe(data => {
          this.ProcesssResponse(data, '')
        });
    }
    else {
      this.addForm.value["modifiedBy"] = this.currentLoginUser.employeeId;
      this.addForm.value["modifiedTime"] = new Date();
      this.apiService.updateEmployee(this.addForm.value)
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
      this.getEmployees();
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