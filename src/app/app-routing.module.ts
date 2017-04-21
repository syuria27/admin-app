import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalesListComponent } from './components/sales-list/sales-list.component';
import { Page404Component } from './components/page-404/page-404.component';
import { AbsenListComponent } from './components/absen-list/absen-list.component';
import { AbsenSalesComponent } from './components/absen-sales/absen-sales.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'absen', component: AbsenListComponent, canActivate:[AuthGuard] },
  { path: 'sales', component: SalesListComponent, canActivate:[AuthGuard] },
  { path: 'sales/:kode_spg', component: AbsenSalesComponent, canActivate:[AuthGuard] },
  { path: '**', pathMatch: 'full', component: Page404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
