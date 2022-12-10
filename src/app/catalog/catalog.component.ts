import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { CatalogTypeService } from '../services/catalog-type.service';
import { CatalogService } from '../services/catalog.service';
import { Catalog } from '../models/catalog';
import { CatalogType } from '../models/catalog-type';
import { LoginService } from '../services/login.service';
import { LogInIser } from '../models/loginuser';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  catalogs: Catalog[] = [];
  catalogTypes: CatalogType[] = [];
  addForm: FormGroup;
  isEdit: boolean = false;
  currentLoginUser: LogInIser;
  statusMessage: string = '';
  isSuccess: Boolean = false;
  isFail: Boolean = false;
  submitted = false;

  get formControls() { return this.addForm.controls; }

  constructor(public formBuilder: FormBuilder, private router: Router,
    public catalogTypeService: CatalogTypeService,
    public apiService: CatalogService,
    public authenticationService: LoginService
  ) { }

  ngOnInit() {
    this.currentLoginUser = this.authenticationService.currentUserValue;
    if (this.currentLoginUser === null || this.currentLoginUser === undefined) {
      this.router.navigate(['login']);
      return;
    }
    this.intialFormValue();
    this.getCatalogTypeDetails();
    this.getCatalogDetails();
  }

  intialFormValue() {
    this.addForm = this.formBuilder.group({
      catalogId: [''],
      catalogName: ['', Validators.required],
      catalogTypeId: ['', Validators.required],
      createdBy: [''],
      createdTime: [''],
      modifiedBy: [''],
      modifiedTime: ['']
    });
  }

  getCatalogTypeDetails() {
    this.catalogTypeService.getCatalogType()
      .subscribe(data => {
        this.catalogTypes = data;
      });
  }

  getCatalogDetails() {
    this.apiService.getCatalog()
      .subscribe(data => {
        this.catalogs = data;
      });
  }

  deleteCatalog(catalog: Catalog): void {
    this.apiService.deleteCatalog(catalog.catalogId)
      .subscribe(data => {
        this.isEdit = false;
        if (data.statusCode == 200) {
          this.catalogs = this.catalogs.filter(u => u !== catalog);
          this.statusMessage = 'Catalog Name: ' + catalog.catalogName + ' deleted successfully'
          this.isFail = true
          this.ShowMessage()
        }
        else {
          this.statusMessage = data.statusDescription
          this.isFail = true
        }
      })
  };

  editCatalog(catalog: Catalog): void {
    this.intialFormValue()
    this.apiService.getCatalogById(+catalog.catalogId)
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

   

    this.addForm.value["createdBy"] = this.currentLoginUser.employeeId;
    this.addForm.value["createdTime"] = new Date();

    if (this.isEdit == false) {
      this.addForm.value["catalogId"] = 0;
      // const formData = new FormData();
      // for (const key of Object.keys(this.addForm.value)) {
      //   const value = this.addForm.value[key];
      //   formData.append(key, value);
      // }
      this.apiService.createCatalog(this.addForm.value)
        .subscribe(data => {
          this.ProcesssResponse(data, '')
        });
    }
    else {
      // const formData = new FormData();
      // for (const key of Object.keys(this.addForm.value)) {
      //   const value = this.addForm.value[key];
      //   formData.append(key, value);
      // }
      this.apiService.updateCatalog(this.addForm.value)
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
      this.getCatalogDetails();
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

  onFileChanged(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      //this.labelImport.nativeElement.innerText = file.name;
      this.addForm.patchValue({
        fileDetails: file,
      });
    }
  }

}
