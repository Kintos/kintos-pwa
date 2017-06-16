import { Injectable } from '@angular/core';
import {AngularFire, AuthProviders, AuthMethods, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import {FirebaseObjectFactoryOpts} from "angularfire2/interfaces";
declare var swal: any;
@Injectable()
export class LoanRequestService {

  public loans: FirebaseListObservable<any>;
  //public loan: FirebaseObjectObservable<any>
  public user: FirebaseListObservable<any>;
  public us: any;

  constructor(public af: AngularFire) {
    this.af.auth.subscribe(
      (auth) => {
        if (auth != null) {
          this.user = this.af.database.list('/registeredUsers/'+auth.uid, { preserveSnapshot: true})
          this.loans = this.af.database.list('/loans/' + auth.uid);
          this.us = this.af.database.object('/registeredUsers/'+auth.uid+'/loan')
        }
      });
    // this.loans = this.af.database.list('/loans/' + this.af.auth.getAuth());
  }

  insertLoanToDB(loan, toPay, expDate, askedDate){
    this.user.subscribe(snapshots=>{
        snapshots.forEach(snapshot => {
          // console.log(snapshot.key, snapshot.val());
          if(String(snapshot.val().loan)=="active"){
            console.log("loan cant be asked again!")
            return;
          } else {
            // console.log(this.us)
            this.us.set("active");
          }
            // console.log(this.us.get("loan"));
           swal({
            title: "¡Gracias "+ String(snapshot.val() + "!"),
            text: "Recibimos tu solicitud y en breve te avisaremos cuando tengas el dinero en tu cuenta",
            imageUrl: "./assets/images/logo-48.png",
            confirmButtonColor: "#86C25C",
            confirmButtonText: "Aceptar",
            html:true
          });
        });
    })
    
    // console.log("loan sent!" + askedDate)
    this.loans.push({
      loan: loan,
      toPay: toPay,
      expDate: expDate,
      askedDate: askedDate,
      status: "To Approve"
    });
  }
}
