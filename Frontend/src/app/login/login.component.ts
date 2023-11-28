import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  constructor(private AuthService: AuthService, private router: Router) { }

  doLogin() {
    const user = this.AuthService.doLogin(this.email, this.password);

    user.subscribe(user => {
      if(!user) {
        console.log('Credenciales incorrectas')
        return
      }

      console.log(user)

      // redirect to home
      this.router.navigate(['/']);
    })
  }

}
