import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalesListComponent } from './sales-list/sales-list.component';
import { AbsenSalesComponent } from './absen-sales/absen-sales.component';
import { ProductSalesComponent } from './product-sales/product-sales.component';
import { FocusSalesComponent } from './focus-sales/focus-sales.component';
import { ReportSalesComponent } from './report-sales.component';
import { AuthGuard } from '../../guards/auth.guard';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

const routes: Routes = [
  { path: 'report-sales', 
    component: ReportSalesComponent, 
    children:[
      { path: '', pathMatch: 'full', redirectTo: 'sales-list' },
      { path: 'sales-list', component: SalesListComponent },
      { path: 'absen/:kode_spg', component: AbsenSalesComponent },
      { path: 'product/:kode_spg', component: ProductSalesComponent },
      { path: 'focus/:kode_spg', component: FocusSalesComponent }
   ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportSalesRoutingModule { }
