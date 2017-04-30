import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SpinnerModule } from 'angular2-spinner/dist';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { PaginationModule, AlertModule } from 'ngx-bootstrap';

import { SalesListComponent } from './sales-list/sales-list.component';
import { AbsenSalesComponent } from './absen-sales/absen-sales.component';
import { SalesService } from '../../services/sales.service';
import { AbsenService } from '../../services/absen.service';

import { ReportSalesRoutingModule } from './report-sales-routing.module';
import { ReportSalesComponent } from './report-sales.component';
import { ProductSalesComponent } from './product-sales/product-sales.component';
import { FocusSalesComponent } from './focus-sales/focus-sales.component';
import { ProductService } from './../../services/product.service';

@NgModule({
  imports: [
    Ng2TableModule,
    PaginationModule.forRoot(),
    AlertModule.forRoot(),
    SpinnerModule,
    FormsModule,
    CommonModule,
    ReportSalesRoutingModule
  ],
  declarations: [
    SalesListComponent,
    AbsenSalesComponent,
    ReportSalesComponent,
    ProductSalesComponent,
    FocusSalesComponent
  ],
  providers: [SalesService, AbsenService, ProductService]
})
export class ReportSalesModule { }
