import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { EmployeeFundHistoryService } from '../services/employee-fund-history.service';
import { EmployeeFundHistory } from '../models/employee-fund-history';
import { LoginService } from '../services/login.service';
import { LogInIser } from '../models/loginuser';

@Component({
  selector: 'app-employee-fund-history',
  templateUrl: './employee-fund-history.component.html',
  styleUrls: ['./employee-fund-history.component.scss']
})
export class EmployeeFundHistoryComponent implements OnInit {

  employeeFundHistory: EmployeeFundHistory[] = [];
  currentLoginUser: LogInIser;
  statusMessage: string = '';
  isSuccess: Boolean = false;
  isFail: Boolean = false;
  totalAmount: number = 0;

  constructor(private router: Router,
    public employeeFundHistoryService: EmployeeFundHistoryService,
    public authenticationService: LoginService
  ) { }

  ngOnInit() {
    this.currentLoginUser = this.authenticationService.currentUserValue;
    if (this.currentLoginUser === null || this.currentLoginUser === undefined) {
      this.router.navigate(['login']);
      return;
    }
    this.getEmployeeFundHistory();
  }


  getEmployeeFundHistory() {
    this.employeeFundHistoryService.getEmployeeFundHistoryById(this.currentLoginUser.employeeId)
      .subscribe(data => {
        this.employeeFundHistory = data;
        this.employeeFundHistory.forEach(element => {
          this.totalAmount += element.perkValue;
        });
      });
  }
}

