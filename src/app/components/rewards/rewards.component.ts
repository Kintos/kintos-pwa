import { ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { Component } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Subject } from 'rxjs/Subject';

declare var swal: any;

@Component({
   moduleId: module.id,
   selector: 'rewards',
   templateUrl: './rewards.component.html',
   styleUrls: ['./rewards.component.css']
})

export class RewardsComponent {
    
    items: FirebaseListObservable<any[]>;
    powerups: FirebaseListObservable<any[]>;
    info: Reward[] = [];
    wallet: FirebaseListObservable<any[]>;

    constructor(db: AngularFireDatabase, public af: AngularFire){
      this.af.auth.subscribe(
        (auth) => {
          if (auth != null) {
              this.wallet = this.af.database.list('/wallet/' + auth.uid);
              this.powerups = db.list('/wallet'+ auth.uid);          
          }
      })
      this.items = db.list('/rewards');
      db.list('/rewards', { preserveSnapshot: true})
        .subscribe(snapshots=>{
        snapshots.forEach(snapshot => {
          this.info.push(snapshot.val());
        });
      });
    }

    showModal(i){
      swal({
        title: this.info[i].name ,
        text: this.info[i].description,
        imageUrl: this.info[i].logo,
        showCancelButton: true,
        confirmButtonColor: "#86C25C",
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar",
        html:true
      });
    
      this.wallet.push({
        name: this.info[i].name,
        brief: this.info[i].brief,
        description: this.info[i].description,
        price: this.info[i].price,
        logo: this.info[i].logo
      })

    }


}
  interface Reward {
      name: String;
      brief: String;
      description: String;
      price: Number;
      logo: String;
  }
