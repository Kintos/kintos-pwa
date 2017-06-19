import { Injectable } from '@angular/core';
import {AngularFire, AngularFireDatabase, AuthProviders, AuthMethods, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import {FirebaseObjectFactoryOpts} from "angularfire2/interfaces";

import 'rxjs/add/operator/take';
import {Observable} from 'rxjs/Rx';

declare var swal: any;
@Injectable()
export class LoanRequestService {

  public loans: FirebaseListObservable<any>;
  public user: any;
  public us: any;
  public kintos: any;
  public noKintos: number;

  constructor(public af: AngularFire) {

    this.af.auth.subscribe(
      (auth) => {
        if (auth != null) {
          this.user = this.af.database.list('/registeredUsers/'+auth.uid, { preserveSnapshot: true })
          this.loans = this.af.database.list('/loans/' + auth.uid);
          this.us = this.af.database.object('/registeredUsers/'+auth.uid+'/loan')
          this.kintos = this.af.database.object('/registeredUsers/'+auth.uid+'/kintos')
          this.getKintos();
        }
      });
  }

  ngOnInit(){

  }

  getKintos(){
     let kintoslistener = this.kintos.subscribe(kintos=>{
        // console.log('Got items: ', kintos.$value);
        this.noKintos = Number(kintos.$value) + 10
        // console.log(this.noKintos)
     })
  }

  insertLoanToDB(loan, toPay, expDate, askedDate){
    let listen = this.user.subscribe(snapshots=>{
        snapshots.forEach(snapshot => {
          console.log(snapshot.key, snapshot.val());
          if(String(snapshot.key) == "loan"){
            if(String(snapshot.val())=="active"){
              //console.log("loan cant be asked again!")
              return;
            } else {
              this.us.set("active");
              this.kintos.set(this.noKintos);

              this.loans.push({
                loan: loan,
                toPay: toPay,
                expDate: expDate,
                askedDate: askedDate,
                status: "To Approve"
              });

              swal({
                title: "¡Gracias!",
                text: "Recibimos tu solicitud y en breve te avisaremos cuando tengas el dinero en tu cuenta",
                imageUrl: "./assets/images/logo-48.png",
                confirmButtonColor: "#86C25C",
                confirmButtonText: "Aceptar",
                html:true
              });

            }
          }
        }); // end of forEach
    }); // end for subscribe
    listen.unsubscribe();
    // this.user.unsubscribe()
  }
}
