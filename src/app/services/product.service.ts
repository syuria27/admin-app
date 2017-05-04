import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Product } from '../models/product';
import { ProductList } from '../models/product-list';
import { Sales } from '../models/sales';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';

@Injectable()
export class ProductService {
private apiUrl: string = 'http://npspgmanagement.co.id:3000/api/product';
  
  constructor(private http : Http, private auth: AuthService) { }

  /**
   * Get All Product
   */
  getAllProducts(): Observable<ProductList[]>{
    return this.http.get(`${this.apiUrl}s`)
      .map(res => res.json().products)
      .map(prods => {
        return prods.map(prd =>{
          let status: string;
          if (prd.status == 1) {
            status = 'AKTIF';
          } else {
            status = 'NON AKTIF';
          }
          return{
            kode_product : prd.kode_product,
            nama_product : prd.nama_product,
            status : status
          };
        });
      })
      .catch(this.handleError);
  }

  /**
   * Create Product
   */
  createProduct(nama_product: string): Observable<any>{
    return this.http.post(`${this.apiUrl}/create`, {nama_product})
      .map(res => res.json())
      .catch(this.handleError);
  }

  /**
   * Update Product
   */
  updateProduct(kode_product: string, nama_product: string): Observable<any>{
    return this.http.put(`${this.apiUrl}/update`, {kode_product, nama_product})
    .map(res => res.json())
    .catch(this.handleError);
  }

  /**
   * Update Status
   */
  updateStatus(kode_product: string, status: number): Observable<any>{
    return this.http.put(`${this.apiUrl}/status`, {kode_product, status})
    .map(res => res.json())
    .catch(this.handleError);
  }

  /**
    * Get Product
    */
  getProduct(kode_product: string): Observable<ProductList> {
      return this.http.get(`${this.apiUrl}/${kode_product}`)
        .map(res => res.json().product)
        .catch(this.handleError);
  }

  /**
   * Get Sales Product
   */
  getSalesProduct(kode_spg: string, bulan: number, tahun: number): Observable<Product[]>{
    return this.http.get(`${this.apiUrl}/user/${kode_spg}/${bulan}/${tahun}`)
      .map(res => res.json().products)
      .catch(this.handleError);
  }

  /**
   * Get Daily Product
   */
  getDailyProduct(tanggal: string): Observable<Product[]>{
    let sales: Sales = this.auth.getUserInfo();
    return this.http.get(`${this.apiUrl}/daily/${sales.depot}/${tanggal}`)
      .map(res => res.json().products)
      .catch(this.handleError);
  }

  /**
   * Get Daily Product
   */
  getMonthlyProduct(bulan: number, tahun:number): Observable<Product[]>{
    let sales: Sales = this.auth.getUserInfo();
    return this.http.get(`${this.apiUrl}/monthly/${sales.depot}/${bulan}/${tahun}`)
      .map(res => res.json().products)
      .catch(this.handleError);
  }

   /**
    * Handle any error from the API
    */
  private handleError(err){
    let errMessage: string;

    if(err instanceof Response){
      let body = err.json() || '';
      let error = JSON.stringify(body.error_msg);
      errMessage = `${err.status} - ${error}`; 
    }else{
      errMessage = err.message ? err.message : err.toString();
    }  
      return Observable.throw(errMessage);
  }

}
