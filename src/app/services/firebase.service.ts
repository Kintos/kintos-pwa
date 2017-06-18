import { Injectable } from '@angular/core';
import { AngularFire, AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable  } from 'angularfire2';

@Injectable()
export class FirebaseService {
  userInfo : FirebaseObjectObservable <User>;
  // user: User[] = [];

  constructor(private af: AngularFire, private db: AngularFireDatabase) { }

  getUser(){
    this.af.auth.subscribe((auth) => {
        this.userInfo = this.db.object('/registeredUsers/'+auth.uid+'/') as FirebaseObjectObservable<User>;
      }); 
    return this.userInfo;
  }

  getCard(){

  }

  getMovements(){

  }
}


interface User{
  $key?:string;
  email?: string;
  name?: string;
}