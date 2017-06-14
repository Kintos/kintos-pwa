import { Injectable } from '@angular/core';
import {AngularFire, AuthProviders, AuthMethods, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import {FirebaseObjectFactoryOpts} from "angularfire2/interfaces";

@Injectable()
export class LoanRequestService {

  public loans: FirebaseListObservable<any>;
  public loan: FirebaseObjectObservable<any>
  constructor(public af: AngularFire) {
    this.af.auth.subscribe(
      (auth) => {
        if (auth != null) {
          this.loans = this.af.database.list('/loans/' + auth.uid);
        }
      });

    // this.loans = this.af.database.list('/loans/' + this.af.auth.getAuth());

  }

  insertLoanToDB(loan, toPay, expDate){
    console.log("loan sent!");
    this.loans.push({
      loan: loan,
      toPay: toPay,
      expDate: expDate,
      status: "To Approve"
    });
  }
}
