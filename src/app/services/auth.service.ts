import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Sales } from '../models/sales';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';

@Injectable()
export class AuthService {
  private authUrl: string = 'http://192.168.1.10/api/login';
  private loggedIn: boolean = false;
  
  constructor(private http: Http) {
    this.loggedIn = !!localStorage.getItem('userInfo');
  }

  sudahLogin(): boolean {
    return this.loggedIn;
  }

  
  login(username: string, password: string): Observable<Sales> {
    let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    let body = `username=${username}&password=${password}`;

    return this.http.post(this.authUrl, body, { headers: headers })
      .map(res => res.json().user)
      .do(res => {
          localStorage.setItem('userInfo', JSON.stringify(res));
          this.loggedIn = true;
      })
      .catch(this.handleError);
  }

  logout(){
    localStorage.removeItem('userInfo');
    this.loggedIn = false;
  }

  getUserInfo(): Sales{
    return JSON.parse(localStorage.getItem('userInfo'));
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
