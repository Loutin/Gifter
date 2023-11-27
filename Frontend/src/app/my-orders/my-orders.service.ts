import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { Order } from 'src/interfaces/Order.interface';

@Injectable({
  providedIn: 'root'
})
export class MyOrdersService{

  baseUrlOrders = "http://localhost:3000/clients";
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) { }


  getOrders(): Observable<Order[]> {

    const user = this.authService.currentUser;

    if(!user){
      this.router.navigate(['/login']);
      return of([]);
    }

    const urlOrders = `${this.baseUrlOrders}/${user.id}/orders`;
    console.log(urlOrders);

    return this.http.get<Order[]>(urlOrders).pipe(
      tap(_ => console.log('fetched orders')),
      catchError(this.handleError<Order[]>('getOrders', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
