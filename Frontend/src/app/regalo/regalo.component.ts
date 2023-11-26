import { Component, Input } from '@angular/core';
import { Regalo } from 'src/interfaces/regalo.interface';
import { ShoppingCartServiceService } from '../shopping-cart/shopping-cart-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-regalo',
  templateUrl: './regalo.component.html',
  styleUrls: ['./regalo.component.css']
})
export class RegaloComponent {
  @Input()
  public regalo!: Regalo;

  constructor(private shoppingCartService: ShoppingCartServiceService, private router: Router) {}

  comprar(){
    this.shoppingCartService.agregarAlCarrito(this.regalo);
    this.router.navigate(['/shopping-cart']);
  }
  agregarAlCarrito(){
    this.shoppingCartService.agregarAlCarrito(this.regalo);
  }
}
