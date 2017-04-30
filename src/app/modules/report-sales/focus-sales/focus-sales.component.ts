import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SalesService } from '../../../services/sales.service';
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


  constructor(
    private route: ActivatedRoute, 
    private salesService: SalesService,
  ) { }

  ngOnInit() {
    this.getMonthYear();
    this.getSales();
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

}
