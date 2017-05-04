import { Component, OnInit } from '@angular/core';
import { Focus } from '../../models/focus';
import { FocusService } from '../../services/focus.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-focus-list',
  templateUrl: './focus-list.component.html',
  styles: []
})
export class FocusListComponent implements OnInit {
  errorMessage: string;
  loading: boolean = false;
  linkExport: string = `http://npspgmanagement.co.id/export/focus/all_focus/${this.sales.depot}`;

  get sales(){
    return this.auth.getUserInfo();
  }
  
  public rows:Array<any> = [];
  public columns:Array<any> = [
    {title: 'Kode SPG', name: 'kode_spg', className: ['text-center','td-width-90']},
    {title: 'Nama SPG', name: 'nama_spg', className: ['text-center','td-width-110']},
    {title: 'Nama Toko', name: 'nama_toko', className: ['text-center','td-width-110']},
    {title: 'Depot', name: 'depot', className: ['text-center','td-width-90']},
    {title: 'VPRO PPRO MATEX KIMEX', name: 'VPRO_PPRO_MATEX_KIMEX', className: ['text-center','td-width-110'], classNameTd: ['text-center']},
    {title: 'BODELAC 2IN1 ANTI KARAT RM', name: 'BODELAC_2IN1_ANTI_KARAT_RM', className: ['text-center','td-width-110'], classNameTd: ['text-center']},
    {title: '5100', name: 'F_5100', className: ['text-center','td-width-90'], classNameTd: ['text-center']},
    {title: '5200', name: 'F_5200', className: ['text-center','td-width-90'], classNameTd: ['text-center']},
    {title: '5400', name: 'F_5400', className: ['text-center','td-width-90'], classNameTd: ['text-center']},
    {title: 'PLATONE 800 or BEE BRAND 1000', name: 'PLATONE_800_or_BEE_BRAND_1000', className: ['text-center','td-width-110'], classNameTd: ['text-center']},
    {title: 'FLAWLESS BW', name: 'FLAWLESS_BW', className: ['text-center','td-width-90'], classNameTd: ['text-center']},
    {title: 'WEATHERBOND RM', name: 'WEATHERBOND_RM', className: ['text-center','td-width-130'], classNameTd: ['text-center']},
    {title: 'MATEX CAT GENTENG CCM', name: 'MATEX_CAT_GENTENG_CCM', className: ['text-center','td-width-110'], classNameTd: ['text-center']},
    {title: 'STONESHIELD', name: 'STONESHIELD', className: ['text-center',,'td-width-110'], classNameTd: ['text-center']},
    {title: 'WEATHERBOND BW', name: 'WEATHERBOND_BW', className: ['text-center','td-width-120'], classNameTd: ['text-center']},
    {title: 'NIPPON WOOD STAIN RM', name: 'NIPPON_WOOD_STAIN_RM', className: ['text-center','td-width-110'], classNameTd: ['text-center']},
    {title: 'ELASTEX RM', name: 'ELASTEX_RM', className: ['text-center', 'td-width-90'], classNameTd: ['text-center']},
    {title: 'TIMBERFINISH RM', name: 'TIMBERFINISH_RM', className: ['text-center','td-width-110'], classNameTd: ['text-center']},
    {title: 'SPOTLESS BW', name: 'SPOTLESS_BW', className: ['text-center', 'td-width-90'], classNameTd: ['text-center']},
    {title: 'NP ZINC CHROMATE GREEN', name: 'NP_ZINC_CHROMATE_GREEN', className: ['text-center','td-width-90'], classNameTd: ['text-center']},
    {title: 'BODELAC 2IN1 ANTI KARAT CCM', name: 'BODELAC_2IN1_ANTI_KARAT_CCM', className: ['text-center','td-width-110'], classNameTd: ['text-center']},
    {title: 'ROOF COATING RM', name: 'ROOF_COATING_RM', className: ['text-center','td-width-90'], classNameTd: ['text-center']},
    {title: 'NIPPON 9000', name: 'NIPPON_9000', className: ['text-center','td-width-90'], classNameTd: ['text-center']},
    {title: 'SPORTSKOTE CCM', name: 'SPORTSKOTE_CCM', className: ['text-center','td-width-110'], classNameTd: ['text-center']},
    {title: 'NIPPON WOOD STAIN CCM', name: 'NIPPON_WOOD_STAIN_CCM', className: ['text-center','td-width-110'], classNameTd: ['text-center']},
    {title: 'ELASTEX TINTING', name: 'ELASTEX_TINTING', className: ['text-center', 'td-width-90'], classNameTd: ['text-center']},
    {title: 'BODELAC 8000 ZINC CHROMATE GREEN', name: 'BODELAC_8000_ZINC_CHROMATE_GREEN', className: ['text-center','td-width-150'], classNameTd: ['text-center']}  
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

  private data:Array<Focus> = [];

  constructor(private focusService: FocusService, private auth: AuthService) {
    this.length = this.data.length;
   }


  ngOnInit() {
    this.getFocusReport();
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

  getFocusReport() {
    this.data = [];
    this.length = this.data.length; // this is for pagination
    this.onChangeTable(this.config);
    this.loading = true;
    this.focusService.getFocusReport()
      .subscribe(
        fcs =>{
          this.data = fcs;
          console.log(this.data);
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
    
  }

}
