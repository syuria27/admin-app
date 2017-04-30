import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { Overlay } from 'angular2-modal';
import { Sales } from '../../models/sales';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {
  credentials = {username: '', password: ''};
  errorMessage = '';
  loggedIn: boolean;
  loading: boolean = false;

  constructor(
    private overlay: Overlay,
    private vcRef: ViewContainerRef,
    private auth: AuthService, 
    private router: Router,
    private modal: Modal) 
  { 
    overlay.defaultViewContainer = vcRef;
  }

  get isLoggedIn(){
    return this.auth.sudahLogin()
  }

  get isAdmin(){
    return this.auth.isAdmin();
  }

  get sales(){
    return this.auth.getUserInfo();
  }

  ngOnInit() {
  }

  login(){
    this.loading = true;
    this.auth.login(this.credentials.username, this.credentials.password)
      .subscribe(
        data =>{
          this.loading = false;
          this.router.navigate(['/home']);
        },
        err =>{
          this.loading = false;
          this.modal.alert()
            .size('sm')
            .showClose(true)
            .title('Alert..!!')
            .body(err)
            .bodyClass('alert alert-danger')
            .open();
        }
      )
  }

  logout(){
    this.auth.logout();
    this.router.navigate(['/home']);
  }

}
