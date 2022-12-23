import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { CatalogTypeService } from '../services/catalog-type.service';
import { CatalogService } from '../services/catalog.service';
import { Catalog } from '../models/catalog';
import { CatalogType } from '../models/catalog-type';
import { LoginService } from '../services/login.service';
import { LogInIser } from '../models/loginuser';
import { environment } from 'src/environments/environment';

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
  selectedFile: File = null;
  imagUrl: string = '';

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
    this.imagUrl = `${environment.imagUrl}`;
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
      modifiedTime: [''],
      imageFileName: ['']
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
          this.reset()
        }
        else {
          this.statusMessage = data.statusDescription
          this.isFail = true
        }
      })
      window.scrollTo(0,0)
  };

  editCatalog(catalog: Catalog): void {
    this.intialFormValue()
    this.apiService.getCatalogById(+catalog.catalogId)
      .subscribe(data => {
        this.addForm.setValue(data);
      });

    this.isEdit = true;
    window.scrollTo(0,0)
  };

  onSubmit() {

    this.submitted = true;

    if (this.addForm.invalid) {
      return;
    }
    this.submitted = false;
    const formData = new FormData();
    formData.append('catalogName', this.addForm.value["catalogName"]);
    formData.append('catalogTypeId', this.addForm.value["catalogTypeId"]);
    formData.append('fileDetails', this.selectedFile);
    formData.append('createdBy', this.currentLoginUser.employeeId.toString());
    formData.append('modifiedBy', this.currentLoginUser.employeeId.toString());
    if (this.isEdit == false) {
      formData.append('catalogId', '0');
      this.apiService.createCatalog(formData)
        .subscribe(data => {
          this.ProcesssResponse(data, '')
        });
    }
    else {
      formData.append('catalogId', this.addForm.value["catalogId"]);
      this.apiService.updateCatalog(formData)
        .subscribe(data => {
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
    this.selectedFile = null;
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

  chooseFile(files: FileList) {
    this.selectedFile = files[0];
  }

}
