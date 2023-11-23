import { Injectable } from '@angular/core';
import { Regalo } from '../../interfaces/regalo.interface';
import { CartItem } from 'src/interfaces/CartItem.interface';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartServiceService {

  regalos: CartItem[] = [];

  constructor() {
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

}
