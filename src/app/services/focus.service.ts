import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { FocusSales } from '../models/focus-sales';
import { Focus } from '../models/focus';
import { Sales } from '../models/sales';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';

@Injectable()
export class FocusService {
private apiUrl: string = 'http://192.168.1.10/web-api/focus';
  
  constructor(private http : Http, private auth: AuthService) { }

  /**
   * Get Sales Focus
   */
  getSalesFocus(kode_spg: string): Observable<FocusSales[]>{
    return this.http.get(`${this.apiUrl}/user/${kode_spg}`)
      .map(res => res.json().focuses)
      .catch(this.handleError);
  }

  /**
   * Get Focus Report
   */
  getFocusReport(): Observable<Focus[]>{
    let sales: Sales = this.auth.getUserInfo();
    return this.http.get(`${this.apiUrl}/depot/${sales.depot}`)
      .map(res => res.json().focuses)
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
