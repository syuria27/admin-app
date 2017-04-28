import { Component, OnInit } from '@angular/core';
import { ManageUserService } from '..//manage-user.service';
import { User } from '../user.model';

@Component({
  selector: 'app-input-user',
  templateUrl: './input-user.component.html',
  styles: []
})
export class InputUserComponent implements OnInit {
  user: User;
  loading: boolean = false;
  alerts: any = [];

  zonas = [
    {value: '1', display: 'WIB'},
    {value: '2', display: 'WITA'},
    {value: '3', display: 'WIT'}
  ];

  hak_akses = [
    {value: 1, display: 'User'},
    {value: 2, display: 'Admin'}
  ];

  constructor(private manageUserService : ManageUserService) { }

  ngOnInit() {
    this.user = {
      nama_spg : '',
      nama_toko: '',
      depot: '',
      zona: this.zonas[0].value,
      hak_akses: this.hak_akses[0].value
    };
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

  createUser(){
    this.loading = true;
    this.manageUserService.createUser(this.user)
      .subscribe(msg => {
        this.user = {
          nama_spg : '',
          nama_toko: '',
          depot: '',
          zona: this.zonas[0].value,
          hak_akses: this.hak_akses[0].value
        };
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
