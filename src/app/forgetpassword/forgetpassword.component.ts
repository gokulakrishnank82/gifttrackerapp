import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ForgetpasswordService } from '../services/forgetpassword.service';
import { BaseResponse } from '../models/baseresponse';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss']
})
export class ForgetpasswordComponent implements OnInit {
  baseResponse: BaseResponse;
  forgetPasswordForm: FormGroup;
  submitted = false;
  loading = false;
  showMainContent: Boolean = true;
  statusMessage: string = '';
  isSuccess: Boolean = false;
  isFail: Boolean = false;

  get formControls() { return this.forgetPasswordForm.controls; }

  constructor(public formBuilder: FormBuilder, private router: Router,
    public apiService: ForgetpasswordService) { }

  ngOnInit() {
    this.forgetPasswordForm = this.formBuilder.group({
      email: ['', Validators.required],
      mobileNumber: ['', Validators.required]
    });
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }
  onSubmit() {

    this.submitted = true;
    if (this.forgetPasswordForm.invalid) {
      return;
    }

    this.loading = true;
    this.apiService.forgetPassword(this.forgetPasswordForm.value)
      .subscribe(data => {
        if (data.statusCode === 200) {
          this.showMainContent = this.showMainContent ? false : true;
          this.isSuccess = true;
        } else {
          this.isFail = true;
        }
        this.loading = false;
        this.statusMessage = data.statusDescription
        setTimeout(function () {
          this.isSuccess = false;
          this.isFail = false;
        }.bind(this), 3000);
      });
  }

}
