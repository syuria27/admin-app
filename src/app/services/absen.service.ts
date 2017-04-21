import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Absen } from '../models/absen';
import { Sales } from '../models/sales';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class AbsenService {
  private apiUrl: string = 'http://192.168.1.10/api/absen';
  
  constructor(private http : Http, private auth: AuthService) { }

  /**
   * Get User Absen
   */
   getSalesAbsen(kode_spg: string, bulan: number, tahun: number): Observable<Absen[]>{
     return this.http.get(`${this.apiUrl}/user/${kode_spg}/${bulan}/${tahun}`)
      .map(res => res.json().absen)
      .map(absen => {
        return absen.map(abs =>{
          return{
            kode_absen : abs.kode_absen,
            selfie_masuk : `<img src="http://npspgmanagement.co.id/absen-api/upload/${abs.kode_absen}-M.jpeg" width="90" height="90" class="img-rounded"/>`,
            selfie_pulang : `<img src="http://npspgmanagement.co.id/absen-api/upload/${abs.kode_absen}-P.jpeg" width="90" height="90" class="img-rounded"/>`,
            tanggal : abs.tanggal,
            jam_masuk : abs.jam_masuk,
            lokasi_masuk : abs.lokasi_masuk,
            jam_pulang : abs.jam_pulang,
            lokasi_pulang : abs.lokasi_pulang
          };
        });
      })
      .catch(this.handleError);
   }

   /**
    * Get Daily Absen
    */
    getDailyAbsen(tanggal: string): Observable<Absen[]>{
      let sales: Sales = this.auth.getUserInfo();
     return this.http.get(`${this.apiUrl}/depot/${sales.depot}/${tanggal}`)
      .map(res => res.json().absen)
      .map(absen => {
        return absen.map(abs =>{
          return{
            kode_absen : abs.kode_absen,
            selfie_masuk : `<img src="http://npspgmanagement.co.id/absen-api/upload/${abs.kode_absen}-M.jpeg" width="90" height="90" class="img-rounded"/>`,
            selfie_pulang : `<img src="http://npspgmanagement.co.id/absen-api/upload/${abs.kode_absen}-P.jpeg" width="90" height="90" class="img-rounded"/>`,
            nama_spg : abs.nama_spg,
            nama_toko : abs.nama_toko,
            depot : abs.depot,
            tanggal : abs.tanggal,
            jam_masuk : abs.jam_masuk,
            lokasi_masuk : abs.lokasi_masuk,
            jam_pulang : abs.jam_pulang,
            lokasi_pulang : abs.lokasi_pulang
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
