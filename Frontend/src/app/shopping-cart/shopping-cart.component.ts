import { Component } from '@angular/core';
import { ShoppingCartServiceService } from './shopping-cart-service.service';
import { Regalo } from 'src/interfaces/regalo.interface';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent {

  constructor(private shoppingCartService: ShoppingCartServiceService, private authService: AuthService, private router: Router) { }

  estaVacio(){
    return this.shoppingCartService.estaVacio()
  }

  numRegalos(){
    return this.shoppingCartService.numRegalos()
  }

  vaciarCarrito(){
    this.shoppingCartService.vaciarCarrito();
  }

  obtenerRegalos(){
    return this.shoppingCartService.obtenerRegalos()
  }

  obtenerTotal(){
    return this.shoppingCartService.obtenerTotal()
  }

  eliminarDelCarrito(regalo: Regalo){
    this.shoppingCartService.eliminarDelCarrito(regalo);
  }

  finalizarCompras(){
    const user = this.authService.currentUser

    if(!user){
      this.router.navigate(['/login'])
      return
    };

    this.shoppingCartService.realizarPedido()

  }

}
