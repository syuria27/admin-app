import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SpinnerModule } from 'angular2-spinner/dist';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { PaginationModule, AlertModule } from 'ngx-bootstrap';

import { ManageFocusRoutingModule } from './manage-focus-routing.module';
import { ManageFocusComponent } from './manage-focus.component';
import { EditFocusComponent } from './edit-focus/edit-focus.component';
import { CreateFocusComponent } from './create-focus/create-focus.component';
import { ListFocusComponent } from './list-focus/list-focus.component';
import { FocusService } from '../../services/focus.service';
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
    ManageFocusRoutingModule
  ],
  declarations: [ManageFocusComponent, EditFocusComponent, CreateFocusComponent, ListFocusComponent],
  providers: [FocusService, AdminGuard, AuthService]
})
export class ManageFocusModule { }
