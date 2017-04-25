import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SpinnerModule } from 'angular2-spinner/dist';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { PaginationModule, AlertModule, BsDropdownModule } from 'ngx-bootstrap';
import { MyDatePickerModule } from 'mydatepicker';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';

import { ManageUserModule } from './modules/manage-user/manage-user.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AbsenService } from './services/absen.service';
import { SalesService } from './services/sales.service';
import { AbsenListComponent } from './components/absen-list/absen-list.component';
import { SalesListComponent } from './components/sales-list/sales-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { Page404Component } from './components/page-404/page-404.component';
import { AbsenSalesComponent } from './components/absen-sales/absen-sales.component';
import { AuthService } from './services/auth.service';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    AbsenListComponent,
    SalesListComponent,
    NavbarComponent,
    Page404Component,
    AbsenSalesComponent,
    HomeComponent
  ],
  imports: [
    ManageUserModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    Ng2TableModule,
    BsDropdownModule.forRoot(),
    PaginationModule.forRoot(),
    AlertModule.forRoot(),
    SpinnerModule,
    MyDatePickerModule,
    ModalModule.forRoot(),
    BootstrapModalModule
  ],
  providers: [AbsenService, SalesService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
