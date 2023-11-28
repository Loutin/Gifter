import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { RegaloService } from '../regalo.service';
import { Regalo } from 'src/interfaces/regalo.interface';

@Component({
  selector: 'app-favorite-products',
  templateUrl: './favorite-products.component.html',
  styleUrls: ['./favorite-products.component.css']
})
export class FavoriteProductsComponent implements OnInit{

  public favoritos: Regalo[] = [];

  constructor(private authService: AuthService, private regaloService: RegaloService) { }

  ngOnInit(): void {
    this.getFavoritos();
  }

  async getFavoritos(){
    if(this.authService.currentUser?.id){
      this.favoritos = await this.regaloService.getFavoriteProducts(this.authService.currentUser.id);
    }
  }

}
