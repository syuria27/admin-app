import { Component, OnInit } from '@angular/core';
import { IMyOptions, IMyDateModel} from 'mydatepicker';
import { Product } from '../../../models/product';
import { ProductService } from '../../../services/product.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-daily-report',
  templateUrl: './daily-report.component.html',
  styles: []
})
export class DailyReportComponent implements OnInit {
  errorMessage: string;
  loading: boolean = false;
  date = new Date();

  linkExport: string = `http://localhost:81/report/export/absen_by_tanggal/${this.sales.depot}`;
  
  myDatePickerOptions: IMyOptions = {
        editableMonthAndYear: false,
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
    this.productService.getDailyProduct(`${event.date.year}-${event.date.month}-${event.date.day}`)
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
    {title: 'Kode Laporan', name: 'kode_laporan', className: ['text-center','td-width-140']},
    {title: 'Nama SPG', name: 'nama_spg', className: ['text-center','td-width-90']},
    {title: 'Nama Toko', name: 'nama_toko', className: ['text-center','td-width-90']},
    {title: 'Depot', name: 'depot', className: ['text-center','td-width-90']},
    {title: 'Tanggal', name: 'tgl', className: ['text-center','td-width-90']},
    {title: 'ELASTEX', name: 'ELASTEX', className: ['text-center','td-width-80']},
    {title: 'WTB RM', name: 'WTB_RM', className: ['text-center','td-width-50']},
    {title: 'MATEX CAT GENTENG CCM', name: 'MATEX_CAT_GENTENG_CCM', className: ['text-center','td-width-80']},
    {title: 'MM PRIMER', name: 'MM_PRIMER', className: ['text-center','td-width-70']},
    {title: 'STONESHIELD', name: 'STONESHIELD', className: ['text-center','td-width-110']},
    {title: 'VINILEX TINTING', name: 'VINILEX_TINTING', className: ['text-center','td-width-70']},
    {title: 'SPOT LESS', name: 'SPOT_LESS', className: ['text-center','td-width-60']},
    {title: 'MM CLEAR', name: 'MM_CLEAR', className: ['text-center','td-width-60']},
    {title: 'SPORTSKOTE CCM', name: 'SPORTSKOTE_CCM', className: ['text-center','td-width-110']},
    {title: 'WTB SOLAREFLECT', name: 'WTB_SOLAREFLECT', className: ['text-center','td-width-120']},
    {title: 'FLAW LESS', name: 'FLAW_LESS', className: ['text-center','td-width-60']},
    {title: 'ROOF COATING RM', name: 'ROOF_COATING_RM', className: ['text-center','td-width-80']},
    {title: 'TIMBERFINISH RM', name: 'TIMBERFINISH_RM', className: ['text-center','td-width-110']},
    {title: 'BODELAC 2IN1 ANTI KARAT', name: 'BODELAC_2IN1_ANTI_KARAT', className: ['text-center','td-width-80']},
    {title: 'VINILEX RM', name: 'VINILEX_RM', className: ['text-center','td-width-70']},
    {title: 'MM TOP COAT', name: 'MM_TOP_COAT', className: ['text-center','td-width-50']},
    {title: 'NIPPON 9000', name: 'NIPPON_9000', className: ['text-center','td-width-70']},
    {title: 'SEALER SERIES', name: 'BW_SERIES', className: ['text-center','td-width-70']},
    {title: 'WTB CCM', name: 'WTB_CCM', className: ['text-center','td-width-50']},
    {title: 'NIPPON WOOD STAIN', name: 'NIPPON_WOOD_STAIN', className: ['text-center','td-width-70']},
    {title: 'SATIN GLO', name: 'SATIN_GLO', className: ['text-center','td-width-60']},
    {title: 'VPRO PPRO MATEX KIMEX TINTING', name: 'VPRO_PPRO_MATEX_KIMEX_TINTING', className: ['text-center','td-width-110']},
    {title: 'PLATONE 800 or BEE BRAND 1000', name: 'PLATONE_800_or_BEE_BRAND_1000', className: ['text-center','td-width-110']},
    {title: 'NP ZINC CHROMATE GREEN or BODELAC 8000 ZINC CHROMATE', name: 'NP_ZINC_CHROMATE_GREEN_or_BODELAC_8000_ZINC_CHROMATE', className: ['text-center','td-width-150']},
    {title: 'CCM', name: 'jml_ccm', className: ['text-center','td-width-120'], classNameTd: ['text-right']},
    {title: 'RM', name: 'jml_rm', className: ['text-center','td-width-120'], classNameTd: ['text-right']},
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
    className: ['table-striped', 'table-bordered', 'product']
  };
  
  private data:Array<Product> = [];

  constructor(private productService: ProductService, private auth: AuthService) {
    this.length = this.data.length;
   }

  get sales(){
    return this.auth.getUserInfo();
  }

  ngOnInit() {
    this.refresh();
    this.productService.getDailyProduct(`${this.model.date.year}-${this.model.date.month}-${this.model.date.day}`)
      .subscribe(
        prd =>{
          this.data = prd;
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
