import { Injectable } from '@angular/core';
import { IUser } from '../../interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  private readonly USER_KEY = 'user';
  private baseUrl = "http://localhost:3000"
  private user?: IUser = undefined;

  private saveUserToLocalStorage(user: IUser) {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user))
    this.user = user
  }

  async doLogin(email: string, password: string) {
    const res = await fetch(`${this.baseUrl}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })

    if (!res.ok) {
      return null
    }

    const user = await res.json()
    this.saveUserToLocalStorage(user)
    return user
  }

  doLogOut() {
    localStorage.removeItem(this.USER_KEY)
    this.user = undefined
  }

  isAuthenticated() {
    console.log(this.user!==undefined)
    return this.user !== undefined
  }

  get userName() {
    return this.user?.name
  }

}
