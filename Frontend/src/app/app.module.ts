import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SeccionRegalosComponent } from './seccion-regalos/seccion-regalos.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BackPageComponent } from './back-page/back-page.component';

@NgModule({
  declarations: [
    AppComponent,
    SeccionRegalosComponent,
    NavComponent,
    FooterComponent,
    NosotrosComponent,
    LoginComponent,
    RegisterComponent,
    BackPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
