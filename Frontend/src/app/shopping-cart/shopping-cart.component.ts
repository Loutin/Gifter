import { Component } from '@angular/core';
import { ShoppingCartServiceService } from './shopping-cart-service.service';
import { Regalo } from 'src/interfaces/regalo.interface';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent {

  constructor(private shoppingCartService: ShoppingCartServiceService) { }

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

}
