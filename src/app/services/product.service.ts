import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Product } from '../models/product';
import { Sales } from '../models/sales';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';

@Injectable()
export class ProductService {
private apiUrl: string = 'http://192.168.1.10/web-api/product';
  
  constructor(private http : Http, private auth: AuthService) { }

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
