import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { User } from './user.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ManageUserService {

  private apiUrl: string = 'http://localhost:3000/api';

  constructor(private http : Http) { }

  /**
   * Get All User
   */
  getAllUsers(): Observable<User[]>{
    return this.http.get(`${this.apiUrl}/users/ADMIN`)
      .map(res => res.json().users)
      .map(users => {
        return users.map(user =>{
          let zona: string;
          let status: string;
          if (user.zona == 1) {
            zona = 'WIB';
          } else if(user.zona == 2) {
            zona = 'WITA'
          } else {
            zona = 'WIT'
          }

          if (user.status == 1) {
            status = 'AKTIF';
          } else {
            status = 'NON AKTIF';
          }
          return{
            kode_spg : user.kode_spg,
            nama_spg : user.nama_spg,
            nama_toko : user.nama_toko,
            depot : user.depot,
            zona : zona,
            status : status
          };
        });
      })
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
