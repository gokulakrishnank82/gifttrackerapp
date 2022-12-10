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
import { EmployerFundDistributionComponent } from './employer-fund-distribution/employer-fund-distribution.component'
import { CompanyFundTransactionComponent } from './company-fund-transaction/company-fund-transaction.component';
import { EmployeeFundHistoryComponent } from './employee-fund-history/employee-fund-history.component'
import { CatalogComponent } from './catalog/catalog.component'
import { EmployeeOrderComponent } from './employee-order/employee-order.component'
import { GiftCardComponent } from './gift-card/gift-card.component'
import { CouponComponent } from './coupon/coupon.component'

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'businesstype', component: BusinesstypeComponent },
  { path: 'company', component: CompanyComponent },
  { path: 'companycontact', component: CompanycontactComponent },
  { path: 'employee', component: EmployeeComponent },
  { path: 'employerfunddistribution', component: EmployerFundDistributionComponent },
  { path: 'companyfundtransaction', component: CompanyFundTransactionComponent },
  { path: 'paymenttype', component: PaymenttypeComponent },
  { path: 'product', component: ProductComponent },
  { path: 'role', component: RoleComponent },
  { path: 'giftcatalog', component: GiftCardComponent },
  { path: 'coupon', component: CouponComponent },
  { path: 'change-password', component: ChangepasswordComponent },
  { path: 'forget-password', component: ForgetpasswordComponent },
  { path: 'catagory', component: CatalogComponent },
  { path: 'employeeorder', component: EmployeeOrderComponent },
  { path: 'employeefundhistory', component: EmployeeFundHistoryComponent },
  { path: 'charts', loadChildren: () => import('./charts/charts.module').then(m => m.ChartsDemoModule) },
  { path: 'general-pages', loadChildren: () => import('./general-pages/general-pages.module').then(m => m.GeneralPagesModule) },
  { path: 'error-pages', loadChildren: () => import('./error-pages/error-pages.module').then(m => m.ErrorPagesModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

