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
    static userKintos: number;
    static info: Reward[] = [];
    static wallet: FirebaseListObservable<any[]>;
    static kintos: FirebaseObjectObservable<any[]>;

    powerups: FirebaseListObservable<any[]>;
    items: FirebaseListObservable<any[]>;

    static newCupon(i){
      this.wallet.push({
        name: this.info[i].name,
        brief: this.info[i].brief,
        description: this.info[i].description,
        price: this.info[i].price,
        logo: this.info[i].logo
      });
    }

    static reduceKintos(price: number, currentAmount: number){
      return currentAmount - price;
    }

    static enoughKintos(i){

    }

    constructor(db: AngularFireDatabase, public af: AngularFire){
      this.af.auth.subscribe(
        (auth) => {
          if (auth != null) {
              RewardsComponent.wallet = this.af.database.list('/wallet/' + auth.uid);
              RewardsComponent.kintos = this.af.database.object('/registeredUsers/' + auth.uid + '/kintos');
              this.powerups = db.list('/wallet/' + auth.uid);
              db.object('/registeredUsers/' + auth.uid + '/kintos', {preserveSnapshot: true})
              .subscribe(snapshot => {
                RewardsComponent.userKintos = snapshot.val();
              });
              // console.log(auth.uid);
          }
      });

      this.items = db.list('/rewards');
      db.list('/rewards', { preserveSnapshot: true})
        .subscribe(snapshots => {
        snapshots.forEach(snapshot => {
          RewardsComponent.info.push(snapshot.val());
        });
      });

    }

    showModal(i) {
      swal({
        title: RewardsComponent.info[i].name ,
        text: `${RewardsComponent.info[i].description} ${RewardsComponent.info[i].price}
        <img style = 'width: 50px; height:50px;'src = './assets/images/KintosCoin_Icon.svg'>` ,
        imageUrl: RewardsComponent.info[i].logo,
        showCancelButton: true,
        confirmButtonColor: '#86C25C',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        html: true
      },
      function(isConfirm){
        if (isConfirm) {
          swal("Here's a message!");
          console.log(RewardsComponent.info[i].price);
          console.log(RewardsComponent.userKintos);
          console.log(RewardsComponent.info[i].price === RewardsComponent.userKintos);
          if (RewardsComponent.info[i].price <= RewardsComponent.userKintos) {
            RewardsComponent.newCupon(i);
            const newKintos = RewardsComponent.reduceKintos(RewardsComponent.info[i].price, RewardsComponent.userKintos);
            RewardsComponent.kintos.set(newKintos);
            alert("Hemos agreado la promoción a tu cartera")
            swal('Promoción obtenida', 'Revisa tu cartera para revisar las promociones con las que cuentas', 'success');
          }else {
            console.log("No se esta imprimiendo");
            alert("No tienes suficientes Kintos ")
          }
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