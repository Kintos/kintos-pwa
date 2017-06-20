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
    public userKintos: number = 0;
    kintos: FirebaseObjectObservable<any[]>;
    constructor(db: AngularFireDatabase, public af: AngularFire){
      this.af.auth.subscribe(
        (auth) => {
          if (auth != null) {
              this.wallet = this.af.database.list('/wallet/' + auth.uid);
              this.kintos = this.af.database.object('/registeredUsers/' + auth.uid + '/kintos');
              this.powerups = db.list('/wallet/' + auth.uid);
              db.object('/registeredUsers/' + auth.uid + '/kintos', {preserveSnapshot: true})
              .subscribe(snapshot => {
                this.userKintos = snapshot.val();
                console.log(snapshot.val());
                console.log(this.userKintos);
              });
              console.log(auth.uid);
          }
      });

      this.items = db.list('/rewards');
      db.list('/rewards', { preserveSnapshot: true})
        .subscribe(snapshots=>{
        snapshots.forEach(snapshot => {
          this.info.push(snapshot.val());
        });
      });

    }

    newCupon(i){
      this.wallet.push({
        name: this.info[i].name,
        brief: this.info[i].brief,
        description: this.info[i].description,
        price: this.info[i].price,
        logo: this.info[i].logo
      });
    }

    reduceKintos(price: number, currentAmount: number){
      return currentAmount - price;
    }

    hola(){
      console.log('hola');
    }

    enoughKintos(i){
      console.log(this.info[i].price);
          if (this.info[i].price === this.userKintos){
            this.newCupon(i);
            const newKintos = this.reduceKintos(this.info[i].price, this.userKintos);
            this.kintos.set(newKintos);
            swal('Promoción obtenida', 'Revisa tu cartera para revisar las promociones con las que cuentas', 'success');
          }else {
            swal('Kintos insuficientes!', 'En este momento no cuenta con kintos suficientes para comprar este cupon', 'error');
          }
    }
    showModal(i){
      swal({
        title: this.info[i].name ,
        text: `${this.info[i].description} ${this.info[i].price} <img style = 'width: 50px; height:50px;'src = './assets/images/KintosCoin_Icon.svg'>` ,
        imageUrl: this.info[i].logo,
        showCancelButton: true,
        confirmButtonColor: '#86C25C',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        html: true
      },
      function(isConfirm){
        if (isConfirm) {
        }else {

        }
      });
    }


}
  interface Reward {
      name: String;
      brief: String;
      description: String;
      price: number;
      logo: String;
  }
