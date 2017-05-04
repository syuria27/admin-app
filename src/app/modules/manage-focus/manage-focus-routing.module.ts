import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageFocusComponent } from './manage-focus.component';
import { EditFocusComponent } from './edit-focus/edit-focus.component';
import { CreateFocusComponent } from './create-focus/create-focus.component';
import { ListFocusComponent } from './list-focus/list-focus.component';
import { AdminGuard } from './../../guards/admin.guard';

const routes: Routes = [
  { path: 'manage-focus', 
    component: ManageFocusComponent, 
    children:[
      { path: '', pathMatch: 'full', redirectTo: 'list-focus' },
      { path: 'list-focus', component: ListFocusComponent },
      { path: 'create-focus', component: CreateFocusComponent },
      { path: 'edit-focus/:kode_focus', component: EditFocusComponent }
    ],
    canActivate: [AdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageFocusRoutingModule { }
