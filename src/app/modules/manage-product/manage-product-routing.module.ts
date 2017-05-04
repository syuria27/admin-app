import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageProductComponent } from './manage-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { ListProductComponent } from './list-product/list-product.component';
import { AdminGuard } from './../../guards/admin.guard';

const routes: Routes = [
  { path: 'manage-product', 
    component: ManageProductComponent, 
    children:[
      { path: '', pathMatch: 'full', redirectTo: 'list-product' },
      { path: 'list-product', component: ListProductComponent },
      { path: 'create-product', component: CreateProductComponent },
      { path: 'edit-product/:kode_product', component: EditProductComponent }
    ],
    canActivate: [AdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageProductRoutingModule { }
