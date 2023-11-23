import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ShoppingCartServiceService } from '../shopping-cart/shopping-cart-service.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  constructor(public AuthService: AuthService, private shoppingCartServiceService: ShoppingCartServiceService) { }

  logout() {
    this.AuthService.doLogout();
  }

  numRegalos(){
    return this.shoppingCartServiceService.numRegalos();
  }

  estaVacio(){
    return this.shoppingCartServiceService.estaVacio();
  }

}
