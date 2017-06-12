import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Subject } from 'rxjs/Subject';

@Component({
   moduleId: module.id,
   selector: 'movements',
   templateUrl: './movements.component.html',
   styleUrls: ['./movements.component.css']
})

export class MovementsComponent {
  items: FirebaseListObservable<any[]>;
  sizeSubject: Subject<any>;
  
  constructor(db: AngularFireDatabase) {
    this.sizeSubject = new Subject();
    this.items = db.list('/registeredUsers', {
      query: {
        //orderByChild: 'size',
        //equalTo: this.sizeSubject
      }
    });
  }
  filterBy(size: string) {
    this.sizeSubject.next(size); 
  }
}
