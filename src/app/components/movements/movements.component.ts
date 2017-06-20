import { Component } from '@angular/core';
import {  AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Subject } from 'rxjs/Subject';
import { AngularFire } from 'angularfire2';

@Component({
   moduleId: module.id,
   selector: 'movements',
   templateUrl: './movements.component.html',
   styleUrls: ['./movements.component.css'],
})

export class MovementsComponent {
  loans: FirebaseListObservable<any[]>;

  constructor(public af: AngularFire, db: AngularFireDatabase) {
    this.af.auth.subscribe(
      (auth) => {
        if (auth != null) {
          console.log(auth.uid);
          this.loans = this.af.database.list('/loans/' + auth.uid);
        }
      });
    console.log(this.loans);
  }
}
