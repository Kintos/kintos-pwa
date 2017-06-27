import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//import { Observable } from 'rxjs/Observable';
//import { AngularFireModule } from 'angularfire2';

import { AuthService } from "../../services/auth.service";
import {AngularFire, AuthProviders, AuthMethods, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public error: any;
  public wallet: FirebaseListObservable<any>;

  ngOnInit() {
  }

  constructor(private afService: AuthService, private router: Router, public af: AngularFire) {}

  register(event, name, email, password, repassword) {
    event.preventDefault();
    if (repassword === password) {
      this.afService.registerUser(email, password).then((user) => {
      this.afService.saveUserInfoFromForm(user.uid, name, email).then(() => {
        this.wallet = this.af.database.list('wallet/' + user.uid + '/');
         this.wallet.push({
          brief : "$20 MXN descuento en tarro",
          description : "$20 MXN descuento en tarro<br>",
          logo : "https://pbs.twimg.com/profile_images/1536823643/185253_108717869226578_100002650974747_55943_7695242_n_400x400.jpg",
          name : "Sticky Charles",
          price : 20
        });
         document.location.href = '/';
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
    }else {
      this.error = 'Las contraseñas no corresponden';
      this.clearPassword();
    }
  }

  clearPassword(){
    (<HTMLInputElement> document.getElementById('password')).value = '';
    (<HTMLInputElement> document.getElementById('repassword')).value = '';
  }
}
