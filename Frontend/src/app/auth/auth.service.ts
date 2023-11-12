import { Injectable } from '@angular/core';
import { TokenResponse, User, UserAndToken } from './interfaces/user.interface';
import { Observable, catchError, delay, map, of, switchMap, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly USER_KEY = "user";

  private emailsList = ["unmail@unmail.com", "dosmail@dosmail.com", "tremail@tremail.com"];

  private baseUrl = "http://localhost:3000";
  private userAndToken?: UserAndToken = undefined;

  constructor(
  ) { }

  get currentUser(): User | undefined {
    // if (!this.user) return undefined;
    return structuredClone(this.userAndToken?.user);
  }

  private saveUserToLocalStorage(user: UserAndToken) {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    this.userAndToken = user;
  }

  checkAuthentication(): Observable<boolean> {
    if (!localStorage.getItem(this.USER_KEY)) {
      this.userAndToken = undefined;
      return of(false);
    }

    this.userAndToken = JSON.parse(localStorage.getItem(this.USER_KEY)!);

    return new Observable<boolean>(observer => {
      fetch(`${this.baseUrl}/auth/user`, {
        headers: {
          'Authorization': `Bearer ${this.userAndToken?.token}`
        }
      })
        .then(res => res.json())
        .then(user => {
          if (!user) {
            this.userAndToken = undefined;
            observer.next(false);
          } else {
            observer.next(true);
          }
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
          observer.complete();
        });
    });
  }

  isAuthenticated() {
    return this.userAndToken !== undefined;
  }

  doLogin(email: string, password: string): Observable<User> {
    return new Observable<User>(observer => {
      fetch(`${this.baseUrl}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })
        .then(res => res.json())
        .then(async (tokenResponse: any) => {
          console.log("token", tokenResponse.token);
          const token = tokenResponse.token;
          try {
            const res = await fetch(`${this.baseUrl}/auth/user`, {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });
            const user = await res.json();
            this.saveUserToLocalStorage({ user, token });
            observer.next(user);
            observer.complete();
          } catch (error) {
            observer.error(error);
            observer.complete();
          }
        })
        .catch(error => {
          observer.error(error);
          observer.complete();
        })
    });
  }

  async doRegister(name: string, phone: string, email: string, password: string) {
    const description = '';
    console.log(name, phone, email, password, description)
    const client = await fetch(`${this.baseUrl}/clients`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, phone, email, password, description })
    }).then(res => res.json())

    if (client){
      console.log(client)
    }
    return
  }

  getEmails(): string[] {
    return this.emailsList
  }

  isValidMail(email: string): Observable<boolean> {
    return of(!this.emailsList.includes(email)).pipe(
      delay(1000)
    )
  }

  get userName() {
    return this.currentUser?.name
  }

  doLogout() {
    localStorage.removeItem(this.USER_KEY);
    this.userAndToken = undefined;
  }
}
