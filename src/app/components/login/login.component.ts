import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  moduleId : module.id,
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
 public error: any;

  constructor(public afService: AuthService, private router: Router) {}

  loginWithEmail(event, email, password) {
  event.preventDefault();
    this.afService.loginWithEmail(email, password).then(() => {
      this.router.navigate(['']);
      document.location.href = '/';
    })
    .catch((error: any) => {
      if (error) {
        this.error = error;
        console.log(this.error);
      }
    });
  }
}
