import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { LoginService } from '../services/login.service';
import { LogInIser } from '../models/loginuser';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  productDetails: Product[] = [];
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
    public apiService: ProductService,
    public authenticationService: LoginService) { }

  ngOnInit() {
    this.currentLoginUser = this.authenticationService.currentUserValue;
    if (this.currentLoginUser === null || this.currentLoginUser === undefined) {
      this.router.navigate(['login']);
      return;
    }
    this.intialFormValue();
    this.getProductDetails();
  }
  intialFormValue() {
    this.addForm = this.formBuilder.group({
      productId: [''],
      productName: ['', Validators.required],
      active: [true],
      createdBy: [''],
      createdTime: [''],
      modifiedBy: [''],
      modifiedTime: ['']
    });
  }
  getProductDetails() {
    this.apiService.getProduct()
      .subscribe(data => {
        this.productDetails = data;
        console.log(data);
      });
  }

  deleteProduct(product: Product): void {
    this.apiService.deleteProduct(product.productId)
      .subscribe(data => {
        this.isEdit = false;
        if (data.statusCode == 200) {
          this.productDetails = this.productDetails.filter(u => u !== product);
          this.statusMessage = product.productName
          this.statusMessage = ' Product Name: ' + product.productName + ' deleted successfully'
          this.isFail = true
          this.ShowMessage()
        }
        else {
          this.statusMessage = data.statusDescription
          this.isFail = true
        }
      })
  };

  editProduct(product: Product): void {
    this.intialFormValue();
    this.apiService.getProductById(+product.productId)
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
      this.addForm.value["productId"] = 0;
      this.addForm.value["createdBy"] = this.currentLoginUser.employeeId;
      this.addForm.value["createdTime"] = new Date();
      this.apiService.createProduct(this.addForm.value)
        .subscribe(data => {
          this.ProcesssResponse(data, '')
        });
    }
    else {
      this.addForm.value["modifiedBy"] = this.currentLoginUser.employeeId;
      this.addForm.value["modifiedTime"] = new Date();
      this.apiService.updateProduct(this.addForm.value)
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
      this.getProductDetails();
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
