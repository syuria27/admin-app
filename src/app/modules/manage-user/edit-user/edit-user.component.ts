import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ManageUserService } from '..//manage-user.service';
import { User } from '../user.model';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styles: []
})
export class EditUserComponent implements OnInit {
  password: string = '';
  zonas = [
    {value: 1, display: 'WIB'},
    {value: 2, display: 'WITA'},
    {value: 3, display: 'WIT'}
  ];

  hak_akses = [
    {value: 1, display: 'User'},
    {value: 2, display: 'Admin'}
  ];
  
  user: User = {
    nama_spg : '',
    nama_toko: '',
    depot: '',
    zona: '',
    hak_akses: this.hak_akses[0].value
  };
  loading: boolean = false;
  loadingUser: boolean = false;
  errorMessage: string = '';

  

  constructor(
    private manageUserService : ManageUserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getUser();
  }

  updateData(){
    this.loading = true;
    this.manageUserService.updateUser(this.user)
      .subscribe(
        data => {
          console.log(data);
          this.loading = false;
        },
        err => {
          console.log(err);
          this.loading = false;
        }
      );
  }

  updatePassword(){
    console.log(this.password);
  }

  getUser(){
    this.loadingUser = true;
    let kode_spg = this.route.snapshot.params['kode_spg'];
    this.manageUserService.getUser(kode_spg)
      .subscribe(
        sales => {
          console.log(sales);
          this.user = sales;
          this.loadingUser = false;
        },error =>{
           this.errorMessage = error;
           this.loadingUser = false;
        }
      );
  }

}
