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
import { ManageProductModule } from './modules/manage-product/manage-product.module';
import { ManageFocusModule } from './modules/manage-focus/manage-focus.module';
import { ReportSalesModule } from './modules/report-sales/report-sales.module';
import { ProductReportModule } from './modules/product-report/product-report.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AbsenService } from './services/absen.service';
import { FocusService } from './services/focus.service';
import { AbsenListComponent } from './components/absen-list/absen-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { Page404Component } from './components/page-404/page-404.component';
import { AuthService } from './services/auth.service';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { FocusListComponent } from './components/focus-list/focus-list.component';

@NgModule({
  declarations: [
    AppComponent,
    AbsenListComponent,
    NavbarComponent,
    Page404Component,
    HomeComponent,
    FocusListComponent
  ],
  imports: [
    ManageFocusModule,
    ManageProductModule,
    ProductReportModule,
    ManageUserModule,
    ReportSalesModule,
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
  providers: [AbsenService, AuthService, AuthGuard, FocusService],
  bootstrap: [AppComponent]
})
export class AppModule { }
