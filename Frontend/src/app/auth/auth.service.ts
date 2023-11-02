import { Injectable } from '@angular/core';
import { IUser } from '../../interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  private readonly USER_KEY = 'user';
  private baseUrl = "http://localhost:3000"

  private saveUserToLocalStorage(user: IUser) {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user))
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

}
