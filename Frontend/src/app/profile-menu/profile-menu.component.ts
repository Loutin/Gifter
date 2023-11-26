import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/interfaces/user.interface';


@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.css']
})
export class ProfileMenuComponent implements OnInit {
  constructor(private AuthService: AuthService) { 

  }
  ngOnInit(): void {
    this.user = this.AuthService.currentUser;

  }

  user : User | undefined;
}
