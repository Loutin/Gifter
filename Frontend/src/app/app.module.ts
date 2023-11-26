import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SeccionRegalosComponent } from './seccion-regalos/seccion-regalos.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BackPageComponent } from './back-page/back-page.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { CategoriaRegaloComponent } from './categoria-regalo/categoria-regalo.component';
import { RegaloComponent } from './regalo/regalo.component';
import { SeccionRegalosRoutingModule } from './seccion-regalos/seccion-regalos-routing.module';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ShoppingCartServiceService } from './shopping-cart/shopping-cart-service.service';
import { ShoppingCartRoutingModule } from './shopping-cart/shopping-cart-routing.module';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { FavoriteProductsComponent } from './favorite-products/favorite-products.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileMenuComponent } from './profile-menu/profile-menu.component';
import { ProfileMenuRoutingModule } from './profile-menu/profile-menu-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    SeccionRegalosComponent,
    NavComponent,
    FooterComponent,
    NosotrosComponent,
    LoginComponent,
    RegisterComponent,
    BackPageComponent,
    HomeComponent,
    CategoriaRegaloComponent,
    RegaloComponent,
    ShoppingCartComponent,
    MyOrdersComponent,
    FavoriteProductsComponent,
    ProfileComponent,
    ProfileMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SeccionRegalosRoutingModule,
    ShoppingCartRoutingModule,
    HttpClientModule,
    ProfileMenuRoutingModule
  ],
  providers: [ShoppingCartServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
