import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { FocusSales } from '../models/focus-sales';
import { Focus } from '../models/focus';
import { FocusList } from '../models/focus-list';
import { Sales } from '../models/sales';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';

@Injectable()
export class FocusService {
private apiUrl: string = 'http://npspgmanagement.co.id:3000/api/focus';
  
  constructor(private http : Http, private auth: AuthService) { }

  /**
   * Get All Focus
   */
  getAllFocuses(): Observable<FocusList[]>{
    return this.http.get(`${this.apiUrl}es`)
      .map(res => res.json().focuses)
      .map(prods => {
        return prods.map(prd =>{
          let status: string;
          if (prd.status == 1) {
            status = 'AKTIF';
          } else {
            status = 'NON AKTIF';
          }
          return{
            kode_focus : prd.kode_focus,
            nama_focus : prd.nama_focus,
            status : status
          };
        });
      })
      .catch(this.handleError);
  }

  /**
   * Create Focus
   */
  createFocus(nama_focus: string): Observable<any>{
    return this.http.post(`${this.apiUrl}/create`, {nama_focus})
      .map(res => res.json())
      .catch(this.handleError);
  }

  /**
   * Update Focus
   */
  updateFocus(kode_focus: string, nama_focus: string): Observable<any>{
    return this.http.put(`${this.apiUrl}/update`, {kode_focus, nama_focus})
    .map(res => res.json())
    .catch(this.handleError);
  }

  /**
   * Update Status
   */
  updateStatus(kode_focus: string, status: number): Observable<any>{
    return this.http.put(`${this.apiUrl}/status`, {kode_focus, status})
    .map(res => res.json())
    .catch(this.handleError);
  }

  /**
    * Get Focus
    */
  getFocus(kode_focus: string): Observable<FocusList> {
      return this.http.get(`${this.apiUrl}/${kode_focus}`)
        .map(res => res.json().focus)
        .catch(this.handleError);
  }

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
