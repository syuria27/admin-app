import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { ProductList } from '../../../models/product-list';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styles: []
})
export class EditProductComponent implements OnInit {
  productList: ProductList = {
    kode_product: '',
    nama_product: '',
    status: 0
  }

  loading: boolean = false;
  loadingProduct: boolean = false;
  errorMessage: string = '';
  errorUpdate: string = '';
  successUpdate: string = '';

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getProduct();
  }

  updateData(){
    this.loading = true;
    this.productService.updateProduct(this.productList.kode_product, this.productList.nama_product)
      .subscribe(
        data => {
          console.log(data);
          this.successUpdate = data.error_msg;
          this.loading = false;
        },
        err => {
          console.log(err);
          this.errorUpdate = err;
          this.loading = false;
        }
      );
  }

  nonActive(){
    this.loading = true;
    this.productService.updateStatus(this.productList.kode_product,0)
      .subscribe(
        data => {
          console.log(data);
          this.productList.status = 0;
          this.successUpdate = data.error_msg;
          this.loading = false;
        },
        err => {
          console.log(err);
          this.errorUpdate = err;
          this.loading = false;
        }
      );
  }

  active(){
    this.loading = true;
    this.productService.updateStatus(this.productList.kode_product,1)
      .subscribe(
        data => {
          console.log(data);
          this.productList.status = 1;
          this.successUpdate = data.error_msg;
          this.loading = false;
        },
        err => {
          console.log(err);
          this.errorUpdate = err;
          this.loading = false;
        }
      );
  }

  getProduct(){
    this.loadingProduct = true;
    let kode_product = this.route.snapshot.params['kode_product'];
    this.productService.getProduct(kode_product)
      .subscribe(
        prd => {
          console.log(prd);
          this.productList = prd;
          this.loadingProduct = false;
        },error =>{
           this.errorMessage = error;
           this.loadingProduct = false;
        }
      );
  }

}
