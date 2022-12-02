import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule, ThemeService } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { ContentAnimateDirective } from './shared/directives/content-animate.directive';
import { BusinesstypeComponent } from './businesstype/businesstype.component';
import { CompanyComponent } from './company/company.component';
import { CompanycontactComponent } from './companycontact/companycontact.component';
import { EmployeeComponent } from './employee/employee.component';
import { PaymenttypeComponent } from './paymenttype/paymenttype.component';
import { ProductComponent } from './product/product.component';
import { RoleComponent } from './role/role.component';
import { LoginComponent } from './login/login.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { EmployeeTransactionComponent } from './employee-transaction/employee-transaction.component';
import { FundTransactionComponent } from './fund-transaction/fund-transaction.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    DashboardComponent,
    SpinnerComponent,
    ContentAnimateDirective,
    BusinesstypeComponent,
    CompanyComponent,
    CompanycontactComponent,
    EmployeeComponent,
    PaymenttypeComponent,
    ProductComponent,
    RoleComponent,
    LoginComponent,
    ChangepasswordComponent,
    ForgetpasswordComponent,
    EmployeeTransactionComponent,
    FundTransactionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ChartsModule
  ],
  providers: [ThemeService],
  bootstrap: [AppComponent]
})
export class AppModule { }