import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SalesService } from '../../services/sales.service';
import { AbsenService } from '../../services/absen.service';
import { Sales } from '../../models/sales';
import { Absen } from '../../models/absen';

@Component({
  selector: 'app-absen-sales',
  templateUrl: './absen-sales.component.html',
  styles: []
})
export class AbsenSalesComponent implements OnInit {
  sales: Sales;
  errorMessage: string;
  errorMessageSales: string;
  loadingSales: boolean = false;
  loadingAbsen: boolean = false;

  mm: number = 0;
  months = [
    { val: 1,  name: 'Januari' },
    { val: 2,  name: 'February' },
    { val: 3,  name: 'Maret' },
    { val: 4,  name: 'April' },
    { val: 5,  name: 'Mei' },
    { val: 6,  name: 'Juni' },
    { val: 7,  name: 'Juli' },
    { val: 8,  name: 'Agustus' },
    { val: 9,  name: 'September' },
    { val: 10,  name: 'Oktober' },
    { val: 11,  name: 'November' },
    { val: 12,  name: 'Desember' }
  ];
  years: number[] =[];
  yy : number;

  public rows:Array<any> = [];
  public columns:Array<any> = [
    {title:'Kode Absen', name: 'kode_absen', className: ['text-center']},
    {title:'Selfie Masuk', name: 'selfie_masuk', className: ['text-center']},
    {title:'Selfie Pulang', name: 'selfie_pulang', className: ['text-center']},
    {title: 'Tanggal', name: 'tanggal', className: ['text-center']},
    {title: 'Jam Masuk', name: 'jam_masuk', className: ['text-center']},
    {title: 'Lokasi Masuk', name: 'lokasi_masuk', className: ['text-center']},
    {title: 'Jam Pulang', name: 'jam_pulang', className: ['text-center']},
    {title: 'Lokasi Pulang', name: 'lokasi_pulang', className: ['text-center']}
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

  private data:Array<Absen> = [];
    
  constructor(
    private route: ActivatedRoute, 
    private salesService: SalesService,
    private absenService: AbsenService
  ) { 
    this.length = this.data.length;
  }

  ngOnInit() {
    this.getMonthYear();
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
        },error =>{
           this.errorMessageSales = error;
           this.loadingSales = false;
        }
      );
  }

  getMonthYear(){
    var today = new Date();
    this.mm = today.getMonth()+1;
    this.yy = today.getFullYear();        
    for(var i = (this.yy-10); i <= this.yy; i++){
      this.years.push(i);
    }
  }

  search() {
    this.data = [];
    this.length = this.data.length; // this is for pagination
    this.onChangeTable(this.config);
    this.loadingAbsen = true;
    this.absenService.getSalesAbsen(this.sales.kode_spg, this.mm, this.yy)
      .subscribe(
        abs =>{
          this.data = abs;
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
