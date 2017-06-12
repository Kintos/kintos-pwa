import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//import { Observable } from 'rxjs/Observable';
//import { AngularFireModule } from 'angularfire2';

import { AuthService } from "../../services/auth.service";


@Component({
  moduleId : module.id,
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
 public error: any;

  constructor(public afService: AuthService, private router: Router) {}

  // loginWithGoogle() {
  //   this.afService.loginWithGoogle().then((data) => {
  //     // Send them to the homepage if they are logged in
  //     console.log(data);
  //     this.afService.addUserInfo();
  //     this.router.navigate(['']);
  //   })
  // }

  loginWithEmail(event, email, password){
    event.preventDefault();
    this.afService.loginWithEmail(email, password).then(() => {
      this.router.navigate(['']);
      document.location.href = "/"
    })
      .catch((error: any) => {
        if (error) {
          this.error = error;
          console.log(this.error);
        }
      });
  }
} 