import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ChangepasswordService } from '../services/changepassword.service';
import { BaseResponse } from '../models/baseresponse';
import { LoginService } from '../services/login.service';
import { LogInIser } from '../models/loginuser';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {

  baseResponse: BaseResponse;
  changePasswordForm: FormGroup;
  submitted = false;
  loading = false;
  statusMessage: string = '';
  isSuccess: Boolean = false;
  isFail: Boolean = false;
  currentLoginUser: LogInIser;

  get formControls() { return this.changePasswordForm.controls; }

  constructor(public formBuilder: FormBuilder,
    private router: Router,
    public apiService: ChangepasswordService,
    public authenticationService: LoginService) { }

  ngOnInit() {
    this.changePasswordForm = this.formBuilder.group(
      {
        employeeId: [''],
        currentPassword: ['', Validators.required],
        newPassword: ['', Validators.required],
        modifiedBy: [''],
        modifiedTime: ['']
      }

    );
    this.currentLoginUser = this.authenticationService.currentUserValue;
  }

  onSubmit() {

    this.submitted = true;
    if (this.changePasswordForm.invalid) {
      return;
    }

    this.changePasswordForm.value["employeeId"] = this.currentLoginUser.employeeId;
    this.changePasswordForm.value["modifiedBy"] = this.currentLoginUser.employeeId;
    this.changePasswordForm.value["modifiedTime"] = new Date();

    this.loading = true;
    this.apiService.changePassword(this.changePasswordForm.value)
      .subscribe(data => {
        if (data.statusCode === 200)
          this.isSuccess = true;
        else
          this.isFail = true;
        this.statusMessage = data.statusDescription
        setTimeout(function () {
          if (!this.isFail) {
            this.isSuccess = false;
            this.isFail = false;
            this.router.navigate(['/login']);
          }
        }.bind(this), 3000);
      });
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }

}
