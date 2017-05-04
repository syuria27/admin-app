import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { ProductList } from '../../../models/product-list';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styles: []
})
export class CreateProductComponent implements OnInit {
  loading: boolean = false;
  alerts: any = [];
  nama_product: string = '';

  constructor(private productService: ProductService) { } 

  ngOnInit() {
  }

  showAlertSuccess(resp: string): void {
    this.alerts.push({
      type: 'success',
      msg: resp,
      timeout: 5000
    });
  }

  showAlertError(resp: string): void {
    this.alerts.push({
      type: 'danger',
      msg: resp,
      timeout: 5000
    });
  }

  createProduct(){
    this.loading = true;
    this.productService.createProduct(this.nama_product)
      .subscribe(msg => {
        this.nama_product = ''
        this.showAlertSuccess(msg.error_msg);
        this.loading = false;
      },
      err => {
        console.log(err);
        this.showAlertError(err);
        this.loading = false;
      }
    );
  }

}
