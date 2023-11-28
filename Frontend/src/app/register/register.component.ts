import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  name: string = '';
  phone: string = '';
  email: string = '';
  password: string = '';

  constructor(private AuthService: AuthService, private router: Router) { }

  async doRegister() {
    const user = await this.AuthService.doRegister(this.name, this.phone, this.email, this.password);

    console.log(user)

    // redirect to home
    
    this.router.navigate(['/']);

  }

}
