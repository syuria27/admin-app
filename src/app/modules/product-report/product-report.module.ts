import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SpinnerModule } from 'angular2-spinner/dist';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { PaginationModule, AlertModule } from 'ngx-bootstrap';
import { MyDatePickerModule } from 'mydatepicker';

import { ProductService } from './../../services/product.service';

import { ProductReportRoutingModule } from './product-report-routing.module';
import { ProductReportComponent } from './product-report.component';
import { DailyReportComponent } from './daily-report/daily-report.component';
import { MonthlyReportComponent } from './monthly-report/monthly-report.component';

@NgModule({
  imports: [
    MyDatePickerModule,
    Ng2TableModule,
    PaginationModule.forRoot(),
    AlertModule.forRoot(),
    SpinnerModule,
    FormsModule,
    CommonModule,
    ProductReportRoutingModule
  ],
  declarations: [ProductReportComponent, DailyReportComponent, MonthlyReportComponent],
  providers: [ProductService]
})
export class ProductReportModule { }
