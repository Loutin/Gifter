import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/interfaces/user.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  user: User | undefined = undefined;
  constructor(private authService: AuthService) { }
  ngOnInit(): void {
    this.user = this.authService.currentUser;
  }

}
