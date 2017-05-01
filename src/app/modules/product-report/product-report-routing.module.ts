import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductReportComponent } from './product-report.component';
import { DailyReportComponent } from './daily-report/daily-report.component';
import { MonthlyReportComponent } from './monthly-report/monthly-report.component';
import { AuthGuard } from '../../guards/auth.guard';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

const routes: Routes = [
  { path: 'daily-report', component: DailyReportComponent, canActivate:[AuthGuard] },
  { path: 'monthly-report', component: MonthlyReportComponent, canActivate:[AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductReportRoutingModule { }
