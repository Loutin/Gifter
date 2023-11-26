import { Injectable } from '@angular/core';
import { Regalo } from '../../interfaces/regalo.interface';
import { CartItem } from 'src/interfaces/CartItem.interface';
import { AuthService } from '../auth/auth.service';
import { Order, OrderDetail } from 'src/interfaces/Order.interface';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartServiceService {

  regalos: CartItem[] = [];
  urlOrders = "http://localhost:3000/clients";
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private authService: AuthService, private router: Router, private http: HttpClient) {
    console.log("Carrito creado.");
  }

  estaVacio(){
    console.log(this.regalos.length);
    return this.numRegalos() == 0
  }

  numRegalos(){
    let total = 0
    this.regalos.forEach(item => {
      total += item.quantity
    })
    return total
  }

  vaciarCarrito(){
    this.regalos = [];
  }

  obtenerRegalos(){
    return this.regalos
  }

  obtenerTotal(){
    let total = 0;
    this.regalos.forEach(item => {
      total += item.regalo.price * item.quantity
    })
    return total
  }

  eliminarDelCarrito(regalo: Regalo){
    this.regalos = this.regalos.filter(item => item.regalo.id != regalo.id)
  }

  agregarAlCarrito(regalo: Regalo){

    let alreadyExistsInCart = false

    this.regalos.forEach(item => {
      if(item.regalo.id == regalo.id){
        console.log("Ya existe el regalo en el carrito")
        item.quantity += 1
        alreadyExistsInCart = true
        return
      }
    })

    if(alreadyExistsInCart){
      return
    }

    this.regalos.push({regalo: regalo, quantity: 1})

    console.log(this.regalos)
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  realizarPedido(){
    const user = this.authService.currentUser

    if(!user){
      this.router.navigate(['/login'])
      return
    }

    const productsByBusiness: {[key: number]: CartItem[]} = {}
    const url = `${this.urlOrders}/${user.id}/orders`

    this.regalos.forEach(item => {
      if(productsByBusiness[item.regalo.id_business]){
        productsByBusiness[item.regalo.id_business].push(item)
      } else {
        productsByBusiness[item.regalo.id_business] = [item]
      }
    })

    Object.entries(productsByBusiness).forEach(([key, value]) => {

      const orderDetails: OrderDetail[] = value.map(item => {
        return {
          id_product: item.regalo.id,
          quantity: item.quantity
        }
      })

      const order: Order = {
        date: new Date().toISOString(),
        id_client: user.id,
        description: "Carrito de compras",
        id_business: Number(key),
        details: orderDetails
      }

      this.http.post<Order>(url, order, this.httpOptions)
        .pipe(
          tap((newOrder) => console.log(`added order w/ id=${newOrder.id}`)),
          catchError(this.handleError<Order>('realizarPedido'))
        )
        .subscribe(
          order => {
            console.log(order)
          }
        )
    })

    this.vaciarCarrito()

    this.router.navigate(['/'])
  }


}
