import { Injectable } from '@angular/core';
import { AngularFire, AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable  } from 'angularfire2';

@Injectable()
export class FirebaseService {
  userInfo : FirebaseObjectObservable <User>;
  card : any;

  userData: User;

  constructor(private af: AngularFire, private db: AngularFireDatabase) { }

  getUser(){
    this.af.auth.subscribe((auth) => {
        this.userInfo = this.db.object('/registeredUsers/'+auth.uid+'/') as FirebaseObjectObservable<User>;
      }); 
    return this.userInfo;
  }

  readUser(){
    this.af.auth.subscribe((auth) => {
        this.db.object('/registeredUsers/'+auth.uid+'/', {preserveSnapshot:true})
           .subscribe(snapshots=>{
              this.userData = snapshots.val();
              console.log(this.userData.loan);
              return this.userData
        });
      }); 
  }

  getCard(){
     this.af.auth.subscribe((auth) => {
       this.card = this.db.object('/card/'+auth.uid, { preserveSnapshot: true })
     })
  }

  saveCard(){
    
  }

  getMovements(){

  }
}

interface User{
  $key? : string,
  name? : string,
  email? : string,
  kintos? : number,
  loan? : string
}