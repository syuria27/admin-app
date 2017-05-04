import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SalesService } from '../../../services/sales.service';
import { FocusService } from '../../../services/focus.service';
import { FocusSales } from '../../../models/focus-sales';
import { Sales } from '../../../models/sales';

@Component({
  selector: 'app-focus-sales',
  templateUrl: './focus-sales.component.html',
  styles: []
})
export class FocusSalesComponent implements OnInit {
  sales: Sales;
  errorMessage: string;
  errorMessageSales: string;
  loadingSales: boolean = false;
  loadingAbsen: boolean = false;
  linkExport:string = 'http://npspgmanagement.co.id/export/focus/focus_by_uid';

  public rows:Array<any> = [];
  public columns:Array<any> = [
    {title: 'Kode Focus', name: 'kode_focus', className: ['text-center']},
    {title: 'Nama Product', name: 'nama_focus', className: ['text-center']},
    {title: 'Status', name: 'status', className: ['text-center']},
    {title: 'Tanggal', name: 'tanggal', className: ['text-center']}
  ];

  public page:number = 1;
  public itemsPerPage:number = 10;
  public maxSize:number = 5;
  public numPages:number = 1;
  public length:number = 0;

  public config:any = {
    paging: true,
    sorting: {columns: this.columns},
    filtering: {filterString: ''},
    className: ['table-striped', 'table-bordered']
  };

  private data:Array<FocusSales> = [];

  constructor(
    private route: ActivatedRoute, 
    private salesService: SalesService,
    private focusService: FocusService
  ) { this.length = this.data.length; }

  ngOnInit() {
    this.getSales();
  }

  public changePage(page:any, data:Array<any> = this.data):Array<any> {
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  public changeSort(data:any, config:any):any {
    if (!config.sorting) {
      return data;
    }

    let columns = this.config.sorting.columns || [];
    let columnName:string = void 0;
    let sort:string = void 0;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].sort !== '' && columns[i].sort !== false) {
        columnName = columns[i].name;
        sort = columns[i].sort;
      }
    }

    if (!columnName) {
      return data;
    }

    // simple sorting
    return data.sort((previous:any, current:any) => {
      if (previous[columnName] > current[columnName]) {
        return sort === 'desc' ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }

  public changeFilter(data:any, config:any):any {
    let filteredData:Array<any> = data;
    this.columns.forEach((column:any) => {
      if (column.filtering) {
        filteredData = filteredData.filter((item:any) => {
          return item[column.name].match(column.filtering.filterString);
        });
      }
    });

    if (!config.filtering) {
      return filteredData;
    }

    if (config.filtering.columnName) {
      return filteredData.filter((item:any) =>
        item[config.filtering.columnName].match(this.config.filtering.filterString));
    }

    let tempArray:Array<any> = [];
    filteredData.forEach((item:any) => {
      let flag = false;
      this.columns.forEach((column:any) => {
        if (item[column.name].toString().match(this.config.filtering.filterString)) {
          flag = true;
        }
      });
      if (flag) {
        tempArray.push(item);
      }
    });
    filteredData = tempArray;

    return filteredData;
  }

  public onChangeTable(config:any, page:any = {page: this.page, itemsPerPage: this.itemsPerPage}):any {
    if (config.filtering) {
      Object.assign(this.config.filtering, config.filtering);
    }

    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }

    let filteredData = this.changeFilter(this.data, this.config);
    let sortedData = this.changeSort(filteredData, this.config);
    this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
    this.length = sortedData.length;
  }

  public onCellClick(data: any): any {
    console.log(data);
  }

  getSales(){
    this.loadingSales = true;
    let kode_spg = this.route.snapshot.params['kode_spg'];
    this.salesService.getSales(kode_spg)
      .subscribe(
        sales => {
          this.sales = sales;
          this.loadingSales = false;
          this.getFocus(kode_spg);
        },error =>{
           this.errorMessageSales = error;
           this.loadingSales = false;
        }
      );
  }

  getFocus(kode_spg: string) {
    this.data = [];
    this.length = this.data.length; // this is for pagination
    this.onChangeTable(this.config);
    this.loadingAbsen = true;
    this.focusService.getSalesFocus(kode_spg)
      .subscribe(
        fcs =>{
          this.data = fcs;
          this.length = this.data.length; // this is for pagination
          this.onChangeTable(this.config);
          this.loadingAbsen = false;
          this.errorMessage = '';
        },error => {
            this.errorMessage = error;
            this.length = this.data.length; // this is for pagination
            this.onChangeTable(this.config);
            this.loadingAbsen = false;
        }
      );
  }

}
