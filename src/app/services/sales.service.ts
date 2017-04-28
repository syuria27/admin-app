import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Sales } from '../models/sales';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class SalesService {

  private apiUrl: string = 'http://192.168.1.10/web-api';

  constructor(private http : Http, private auth: AuthService) { }

  /**
   * Get All Sales
   */
   getAllSales(): Observable<Sales[]>{
     let sales: Sales = this.auth.getUserInfo();
     return this.http.get(`${this.apiUrl}/sales/${sales.depot}`)
      .map(res => res.json().sales)
      .catch(this.handleError);
   }

   /**
    * Get Sales
    */
    getSales(kode_spg: string): Observable<Sales> {
      let sales: Sales = this.auth.getUserInfo();
      return this.http.get(`${this.apiUrl}/sales/${sales.depot}/${kode_spg}`)
        .map(res => res.json().sales)
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
