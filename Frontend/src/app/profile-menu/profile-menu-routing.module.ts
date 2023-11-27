import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileMenuComponent } from './profile-menu.component';
import { ProfileComponent } from '../profile/profile.component';
import { MyOrdersComponent } from '../my-orders/my-orders.component';
import { FavoriteProductsComponent } from '../favorite-products/favorite-products.component';
import { userIsLogged } from '../auth/guards/auth.guard';
import { OrderDetailComponent } from '../order-detail/order-detail.component';

const routes: Routes = [
  {
    path: 'profile',
    redirectTo: 'profile/my-profile',
    pathMatch: 'full'
  },
  {
    path: 'profile',
    component: ProfileMenuComponent,
    canActivate: [userIsLogged],
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
        path: "orders/:id",
        component: OrderDetailComponent
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
