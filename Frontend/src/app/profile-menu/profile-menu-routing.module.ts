import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileMenuComponent } from './profile-menu.component';
import { ProfileComponent } from '../profile/profile.component';
import { MyOrdersComponent } from '../my-orders/my-orders.component';
import { FavoriteProductsComponent } from '../favorite-products/favorite-products.component';

const routes: Routes = [
  {
    path: 'profile',
    redirectTo: 'profile/my-profile',
    pathMatch: 'full'
  },
  {
    path: 'profile',
    component: ProfileMenuComponent,
    children: [
      {
        path: 'my-profile',
        component: ProfileComponent
      },
      {
        path: "orders",
        component: MyOrdersComponent
      },
      {
        path: "favorite-products",
        component: FavoriteProductsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileMenuRoutingModule { }
