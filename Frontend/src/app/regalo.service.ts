import { Injectable } from '@angular/core';
import { BASE_URL } from 'src/const/util';


@Injectable({
  providedIn: 'root'
})
export class RegaloService {

  constructor() { }

  baseUrl = BASE_URL;

  async getRegalosPorCategoria(category: string) {
    const res = await fetch(`${this.baseUrl}/products/type/${category}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (res.status !== 200) {
      console.log("Error al obtener los regalos");
      return [];
    }

    return await res.json();
  }

  async getRegalo(id: number) {
    const res = await fetch(`${this.baseUrl}/products/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (res.status !== 200) {
      console.log("Error al obtener el regalo");
      return {};
    }

    return await res.json();
  }

  async addToFavorite(id_client: number, id_product: number) {
    const res = await fetch(`${this.baseUrl}/clients/${id_client}/favorite-products/${id_product}`, {
      method: 'POST'
    });

    if (res.status !== 201) {
      console.log("Error al agregar el regalo a favoritos");
      return;
    }

    return;
  }

  async removeFromFavorite(id_client: number, id_product: number) {
    const res = await fetch(`${this.baseUrl}/clients/${id_client}/favorite-products/${id_product}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (res.status !== 204) {
      console.log("Error al remover el regalo de favoritos");
      return;
    }

    return;
  }

  async getFavoriteProducts(id_client: number) {
    const res = await fetch(`${this.baseUrl}/clients/${id_client}/favorite-products`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (res.status !== 200) {
      console.log("Error al obtener los regalos favoritos");
      return [];
    }

    return await res.json();
  }
}
