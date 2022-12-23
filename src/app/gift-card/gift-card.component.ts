import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { CatalogService } from '../services/catalog.service';
import { EmployeeOrderService } from '../services/employee-order.service';
import { EmployeeService } from '../services/employee.service';
import { Catalog } from '../Models/catalog';
import { EmployeeOrder } from '../Models/employee-order';
import { LoginService } from '../services/login.service';
import { LogInIser } from '../models/loginuser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-gift-card',
  templateUrl: './gift-card.component.html',
  styleUrls: ['./gift-card.component.scss']
})
export class GiftCardComponent implements OnInit {
  catalogs: Catalog[] = [];
  employeeOrder: EmployeeOrder[] = [];
  addForm: FormGroup;
  currentLoginUser: LogInIser;
  statusMessage: string = '';
  isSuccess: Boolean = false;
  isFail: Boolean = false;
  submitted = false;
  isTileShow = true;
  selectedCatalogId: number = 0;
  selectedCatalogName: string = '';
  selectedImageUrl: string = '';
  imagUrl: string = '';
  walletBalance: number = 0;

  get formControls() { return this.addForm.controls; }

  constructor(public formBuilder: FormBuilder,
    private router: Router,
    public apiService: CatalogService,
    public employeeOrderService: EmployeeOrderService,
    public employeeService: EmployeeService,
    public authenticationService: LoginService) { }

  ngOnInit() {
    this.intialFormValue();
    this.currentLoginUser = this.authenticationService.currentUserValue;
    if (this.currentLoginUser === null || this.currentLoginUser === undefined) {
      this.router.navigate(['login']);
      return;
    }
    this.imagUrl = `${environment.imagUrl}`;
    this.getCatalogDetails();
    this.getWalletBallance();
  }
  getWalletBallance() {
    this.employeeService.getEmployeeWallet(this.currentLoginUser.employeeId)
      .subscribe(data => {
        this.walletBalance = data;
      });
  }
  getCatalogDetails() {
    this.apiService.getCatalog()
      .subscribe(data => {
        this.catalogs = data;
        this.catalogs = this.catalogs.filter(t => t.catalogTypeId === 1);
      });
  }

  intialFormValue() {
    this.addForm = this.formBuilder.group({
      cardValue: ['', Validators.required],
      quantity: ['', Validators.required],
      total: [''],
      deliveryMode: ['', Validators.required],
      createdBy: [''],
      createdTime: [''],
      modifiedBy: [''],
      modifiedTime: ['']
    });
  }

  selectCatalog(catalog: any) {
    this.isTileShow = false;
    this.selectedCatalogId = catalog.catalogId;
    this.selectedCatalogName = catalog.catalogName;
    this.selectedImageUrl = `${environment.imagUrl}` + catalog.imageFileName;
  }

  onSubmit() {

    this.submitted = true;
    if (this.addForm.invalid) {
      return;
    }
    this.submitted = false;
    this.addForm.value['employeeOrderId'] = 0;
    this.addForm.value["employeeId"] = this.currentLoginUser.employeeId;
    this.addForm.value["catalogId"] = this.selectedCatalogId;
    this.addForm.value["createdBy"] = this.currentLoginUser.employeeId;
    this.addForm.value["createdTime"] = new Date();
    this.employeeOrderService.createEmployeeOrder(this.addForm.value)
      .subscribe(data => {
        this.ProcesssResponse(data)
      });

  }
  ProcesssResponse(data) {
    if (data.statusCode === 200) {
      this.isSuccess = true;
      this.router.navigate(['employeeorder']);
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
    this.intialFormValue();
  }

  priceCalculation() {
    this.isFail = false;
    let total: number
    let quantity: number = this.addForm.value['quantity'] == '' ? 0 : parseInt(this.addForm.value['quantity'])
    let cardValue: number = this.addForm.value['cardValue'] == '' ? 0 : parseInt(this.addForm.value['cardValue'])
    if (quantity > 0 && cardValue > 0) {
      total = cardValue * quantity
      this.addForm.controls['total'].setValue(total);
      if (total > this.walletBalance) {
        this.isFail = true;
        this.statusMessage = 'Enter amount should not be greater than wallet balance'
      }
    }
    else
      this.addForm.controls['total'].setValue('');

  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}