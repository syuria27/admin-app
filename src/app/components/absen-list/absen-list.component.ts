import { Component, OnInit } from '@angular/core';
import { IMyOptions, IMyDateModel} from 'mydatepicker';
import { Absen } from '../../models/absen';
import { AbsenService } from '../../services/absen.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-absen-list',
  templateUrl: './absen-list.component.html',
  styles: []
})
export class AbsenListComponent implements OnInit {
  errorMessage: string;
  loading: boolean = false;
  date = new Date();
  linkExport: string = `http://npspgmanagement.co.id/export/absen/absen_by_tanggal/${this.sales.depot}`;
  
  myDatePickerOptions: IMyOptions = {
        showClearDateBtn: false,
        minYear: 2016,
        width: '252px',
        editableDateField: false,
        dateFormat: 'dd - mm - yyyy',
  };

  model = { date: { 
      year: this.date.getFullYear(), 
      month: this.date.getMonth() + 1, 
      day: this.date.getDate() 
    } 
  };
  
  onDateChanged(event: IMyDateModel) {
    // event properties are: event.date, event.jsdate, event.formatted and event.epoc
    this.refresh();
    this.absenService.getDailyAbsen(`${event.date.year}-${event.date.month}-${event.date.day}`)
      .subscribe(
        abs =>{
          this.data = abs;
          this.length = this.data.length; // this is for pagination
          this.onChangeTable(this.config);
          this.loading = false;
          this.errorMessage = '';
        },error => {
            this.errorMessage = error;
            this.length = this.data.length; // this is for pagination
            this.onChangeTable(this.config);
            this.loading = false;
        }
      );
  }

  refresh():void {
    this.data = [];
    this.length = this.data.length; // this is for pagination
    this.onChangeTable(this.config);
    this.loading = true;
  }

  public rows:Array<any> = [];
  public columns:Array<any> = [
    {title:'Kode Absen', name: 'kode_absen', className: ['text-center']},
    {title:'Selfie Masuk', name: 'selfie_masuk', className: ['text-center']},
    {title:'Selfie Pulang', name: 'selfie_pulang', className: ['text-center']},
    {title: 'Nama SPG', name: 'nama_spg', className: ['text-center']},
    {title: 'Nama Toko', name: 'nama_toko', className: ['text-center']},
    {title: 'Depot', name: 'depot', className: ['text-center']},
    //{title: 'Tanggal', name: 'tanggal', className: ['text-center']},
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

  constructor(private absenService: AbsenService, private auth: AuthService) {
    this.length = this.data.length;
   }

  get sales(){
    return this.auth.getUserInfo();
  }

  ngOnInit() {
    this.refresh();
    this.absenService.getDailyAbsen(`${this.model.date.year}-${this.model.date.month}-${this.model.date.day}`)
      .subscribe(
        abs =>{
          this.data = abs;
          this.length = this.data.length; // this is for pagination
          this.onChangeTable(this.config);
          this.loading = false;
          this.errorMessage = '';
        },error => {
            this.errorMessage = error;
            this.length = this.data.length; // this is for pagination
            this.onChangeTable(this.config);
            this.loading = false;
        }
      );
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
  
}
