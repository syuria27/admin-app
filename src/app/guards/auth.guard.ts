import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router){}

  canActivate(): boolean {
    console.log('Cek auth guard');
    if (this.auth.sudahLogin()) return true;
    this.router.navigate(['/']);
    return false;
  }
}
