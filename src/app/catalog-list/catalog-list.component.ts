import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { CatalogService } from '../services/catalog.service';
import { Catalog } from '../Models/catalog';
import { LoginService } from '../services/login.service';
import { LogInIser } from '../models/loginuser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-catalog-list',
  templateUrl: './catalog-list.component.html',
  styleUrls: ['./catalog-list.component.scss']
})
export class CatalogListComponent implements OnInit {
  catalogs: Catalog[] = [];
  addForm: FormGroup;
  currentLoginUser: LogInIser;
  imagUrl: string = '';
  searchTerm = '';
  term = '';

  get formControls() { return this.addForm.controls; }

  constructor(public formBuilder: FormBuilder,
    private router: Router,
    public apiService: CatalogService,
    public authenticationService: LoginService) { }

  ngOnInit() {
    this.currentLoginUser = this.authenticationService.currentUserValue;
    if (this.currentLoginUser === null || this.currentLoginUser === undefined) {
      this.router.navigate(['login']);
      return;
    }
    this.imagUrl = `${environment.imagUrl}`;
    this.getCatalogDetails();
  }
  
  getCatalogDetails() {
    this.apiService.getCatalog()
      .subscribe(data => {
        this.catalogs = data;
        this.catalogs = this.catalogs.filter(t => t.catalogTypeId === 1);
      });
  }
}