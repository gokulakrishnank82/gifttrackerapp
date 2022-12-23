import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { LoginService } from '../services/login.service';
import { LogInIser } from '../models/loginuser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  loading = false;
  returnUrl: string;
  error: string = '';
  logInIser: LogInIser;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: LoginService) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/dashboard']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    // console.log(this.loginForm.value);
    // const obj = { username: 'Normal user', password: 'Welcome123' };
    // const obj = { username: 'Admin user', password: 'Welcome123' };
    // const obj = { username: 'Super Admin user', password: 'Welcome123' };
    // this.authenticationService.login(this.loginForm.value)

    this.authenticationService.login(this.loginForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.logInIser = data;
          this.loading = false;
          if (this.logInIser.errorDescription != null) {
            this.error = this.logInIser.errorDescription;
          }
          else {
            if (data.isPasswordChange)
              this.router.navigate(['/change-password']);
            else
              this.router.navigate(['/dashboard']);

          }
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }

}
