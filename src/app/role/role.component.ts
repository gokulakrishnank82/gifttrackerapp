import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { RoleService } from '../services/role.service';
import { Role } from '../models/role';
import { LoginService } from '../services/login.service';
import { LogInIser } from '../models/loginuser';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {

  roleDetails: Role[] = [];
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
    public apiService: RoleService,
    public authenticationService: LoginService) { }

  ngOnInit() {
    this.currentLoginUser = this.authenticationService.currentUserValue;
    if (this.currentLoginUser === null || this.currentLoginUser === undefined) {
      this.router.navigate(['login']);
      return;
    }
    this.intialFormValue();
    this.getRoleDetails();
  }

  intialFormValue() {
    this.addForm = this.formBuilder.group({
      roleId: [''],
      roleName: ['', Validators.required],
      active: [true],
      createdBy: [''],
      createdTime: [''],
      modifiedBy: [''],
      modifiedTime: ['']
    });
  }
  getRoleDetails() {
    this.apiService.getRole()
      .subscribe(data => {
        this.roleDetails = data;
        console.log(data);
      });
  }

  deleteRole(role: Role): void {
    this.apiService.deleteRole(role.roleId)
      .subscribe(data => {
        this.isEdit = false;
        if (data.statusCode == 200) {
          this.roleDetails = this.roleDetails.filter(u => u !== role);
          this.statusMessage = role.roleName
          this.statusMessage = ' Role Name: ' + role.roleName + ' deleted successfully'
          this.isFail = true
          this.ShowMessage()
        }
        else {
          this.statusMessage = data.statusDescription
          this.isFail = true
        }
      })
  };

  editRole(role: Role): void {
    this.intialFormValue();
    this.apiService.getRoleById(+role.roleId)
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
      this.addForm.value["roleId"] = 0;
      this.addForm.value["createdBy"] = this.currentLoginUser.employeeId;
      this.addForm.value["createdTime"] = new Date();
      this.apiService.createRole(this.addForm.value)
        .subscribe(data => {
          this.ProcesssResponse(data, '')
        });
    }
    else {
      this.addForm.value["modifiedBy"] = this.currentLoginUser.employeeId;
      this.addForm.value["modifiedTime"] = new Date();
      this.apiService.updateRole(this.addForm.value)
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
      this.getRoleDetails();
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
