import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  constructor(private authService: AuthService) {

  }
  
  public login() {
    this.authService.login('admin', 'root').subscribe()
  }

  public isAuthorized() {
    return this.authService.isAuthorized();
  }

}
