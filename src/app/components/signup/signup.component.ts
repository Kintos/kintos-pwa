import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//import { Observable } from 'rxjs/Observable';
//import { AngularFireModule } from 'angularfire2';

import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  // constructor() { }

  ngOnInit() {
  }

  public error: any;

  constructor(private afService: AuthService, private router: Router) { }

  register(event, name, email, password) {
    event.preventDefault();
    this.afService.registerUser(email, password).then((user) => {
      this.afService.saveUserInfoFromForm(user.uid, name, email).then(() => {
         document.location.href = "/";
        //  this.router.navigate(['']);
      })
        .catch((error) => {
          this.error = error;
        });
    })
      .catch((error) => {
        this.error = error;
        console.log(this.error);
      });
  }

}
