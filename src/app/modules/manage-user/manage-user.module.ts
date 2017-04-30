import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SpinnerModule } from 'angular2-spinner/dist';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { PaginationModule, AlertModule } from 'ngx-bootstrap';

import { ManageUserRoutingModule } from './manage-user-routing.module';
import { InputUserComponent } from './input-user/input-user.component';
import { ListUserComponent } from './list-user/list-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ManageUserComponent } from './manage-user.component';
import { ManageUserService } from './manage-user.service';
import { AdminGuard } from './../../guards/admin.guard';
import { AuthService } from '../../services/auth.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@NgModule({
  imports: [
    Ng2TableModule,
    PaginationModule.forRoot(),
    AlertModule.forRoot(),
    SpinnerModule,
    FormsModule,
    CommonModule,
    ManageUserRoutingModule
  ],
  declarations: [InputUserComponent, ListUserComponent, EditUserComponent, ManageUserComponent],
  providers: [ManageUserService, AdminGuard, AuthService]
})
export class ManageUserModule { }
