import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BusinesstypeComponent } from './businesstype/businesstype.component';
import { CompanyComponent } from './company/company.component';
import { CompanycontactComponent } from './companycontact/companycontact.component';
import { EmployeeComponent } from './employee/employee.component';
import { PaymenttypeComponent } from './paymenttype/paymenttype.component';
import { ProductComponent } from './product/product.component';
import { RoleComponent } from './role/role.component';
import { LoginComponent } from './login/login.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { EmployeeTransactionComponent } from './employee-transaction/employee-transaction.component';
import { FundTransactionComponent } from './fund-transaction/fund-transaction.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'businesstype', component: BusinesstypeComponent },
  { path: 'company', component: CompanyComponent },
  { path: 'companycontact', component: CompanycontactComponent },
  { path: 'employee', component: EmployeeComponent },
  { path: 'employeetransaction', component: EmployeeTransactionComponent },
  { path: 'fundtransaction', component: FundTransactionComponent },
  { path: 'paymenttype', component: PaymenttypeComponent },
  { path: 'product', component: ProductComponent },
  { path: 'role', component: RoleComponent },
  { path: 'change-password', component: ChangepasswordComponent },
  { path: 'forget-password', component: ForgetpasswordComponent },
  { path: 'charts', loadChildren: () => import('./charts/charts.module').then(m => m.ChartsDemoModule) },
  { path: 'general-pages', loadChildren: () => import('./general-pages/general-pages.module').then(m => m.GeneralPagesModule) },
  { path: 'error-pages', loadChildren: () => import('./error-pages/error-pages.module').then(m => m.ErrorPagesModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

