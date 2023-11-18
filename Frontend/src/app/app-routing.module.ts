import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { SeccionRegalosComponent } from './seccion-regalos/seccion-regalos.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { CategoriaRegaloComponent } from './categoria-regalo/categoria-regalo.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },
  // {
  //   path: "seccion-regalos",
  //   component: SeccionRegalosComponent
  // },
  // {
  //   path: "seccion-regalos/:category",
  //   component: CategoriaRegaloComponent
  // },
  {
    path: "shopping-cart",
    component: ShoppingCartComponent
  },
  {
    path: "nosotros",
    component: NosotrosComponent
  },
  {
    path: "",
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
