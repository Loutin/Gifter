import { Component, Input } from '@angular/core';
import { Regalo } from 'src/interfaces/regalo.interface';
import { ShoppingCartServiceService } from '../shopping-cart/shopping-cart-service.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { RegaloService } from '../regalo.service';

@Component({
  selector: 'app-regalo',
  templateUrl: './regalo.component.html',
  styleUrls: ['./regalo.component.css']
})
export class RegaloComponent {
  @Input()
  public regalo!: Regalo;
  public isFavorite: boolean = false;

  constructor(private shoppingCartService: ShoppingCartServiceService, private router: Router, private authService: AuthService, private regaloService: RegaloService) {

    this.checkFavorito();

  }

  comprar(){
    this.shoppingCartService.agregarAlCarrito(this.regalo);
    this.router.navigate(['/shopping-cart']);
  }
  agregarAlCarrito(){
    this.shoppingCartService.agregarAlCarrito(this.regalo);
  }

  logeado(): boolean{
    if(this.authService.currentUser !== undefined){
      return true;
    }
    return false;
  }

  async favorito(){
    if(this.authService.currentUser?.id){
      await this.regaloService.addToFavorite(this.authService.currentUser.id, this.regalo.id);
      this.isFavorite = true;
    }
  }

  async desfavorito(){
    if(this.authService.currentUser?.id){
      await this.regaloService.removeFromFavorite(this.authService.currentUser.id, this.regalo.id);
      this.isFavorite = false;
    }
  }

  async checkFavorito(){
    if(this.authService.currentUser?.id){
      const favorites = await this.regaloService.getFavoriteProducts(this.authService.currentUser.id)
      console.log(favorites);
      favorites.forEach((favorite: { id: number; }) => {
        if(favorite.id === this.regalo.id){
          this.isFavorite = true;
        }
      })
      console.log(this.isFavorite);
    }
  }
}
