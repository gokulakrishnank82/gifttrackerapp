import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { EmployeeOrderService } from '../services/employee-order.service'
import { EmployeeOrderInfo } from '../Models/employee-order-info';
import { LoginService } from '../services/login.service';
import { LogInIser } from '../models/loginuser';

@Component({
  selector: 'app-employee-order',
  templateUrl: './employee-order.component.html',
  styleUrls: ['./employee-order.component.scss']
})
export class EmployeeOrderComponent implements OnInit {
  employeeOrder: EmployeeOrderInfo[] = [];
  currentLoginUser: LogInIser;


  constructor(public formBuilder: FormBuilder,
    private router: Router,
    public apiService: EmployeeOrderService,
    public authenticationService: LoginService) { }

  ngOnInit() {
    this.currentLoginUser = this.authenticationService.currentUserValue;
    if (this.currentLoginUser === null || this.currentLoginUser === undefined) {
      this.router.navigate(['login']);
      return;
    }
    this.getEmployeeOrder();
  }

  getEmployeeOrder() {
    this.apiService.getEmployeeOrder(this.currentLoginUser.employeeId)
      .subscribe(data => {
        this.employeeOrder = data;
      });
  }
}