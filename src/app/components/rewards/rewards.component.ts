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
    static walletDelete: FirebaseObjectObservable<any>;
    static kintos: FirebaseObjectObservable<any[]>;
    static cuponId: any[] = [];
    static db: AngularFireDatabase;
    static userId: any;
    static cuponList: Reward[] = [];
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

    static eliminateCupon(i) {
      RewardsComponent.walletDelete = RewardsComponent.db.object('/wallet/' + RewardsComponent.userId + '/' + RewardsComponent.cuponId[i]);
      console.log(RewardsComponent.cuponId[i]);
      console.log(RewardsComponent.cuponId);
      RewardsComponent.walletDelete.remove();
    }

    constructor(db: AngularFireDatabase, public af: AngularFire){
      this.af.auth.subscribe(
        (auth) => {
          if (auth != null) {
              RewardsComponent.userId = auth.uid;
              RewardsComponent.db = this.af.database;
              RewardsComponent.wallet = this.af.database.list('/wallet/' + auth.uid);
              RewardsComponent.kintos = this.af.database.object('/registeredUsers/' + auth.uid + '/kintos');
              this.powerups = db.list('/wallet/' + auth.uid);
              db.list('/wallet/' + auth.uid,  {preserveSnapshot: true})
              .subscribe(snapshots => {
                RewardsComponent.cuponId = [];
                RewardsComponent.cuponList = [];
                snapshots.forEach(snapshot => {
                  RewardsComponent.cuponId.push(snapshot.key);
                  RewardsComponent.cuponList.push(snapshot.val());
                  console.log(RewardsComponent.cuponId);
                });
              })
              db.object('/registeredUsers/' + auth.uid + '/kintos', {preserveSnapshot: true})
              .subscribe(snapshot => {
                RewardsComponent.userKintos = snapshot.val();
              });
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
          if (RewardsComponent.info[i].price <= RewardsComponent.userKintos) {
            RewardsComponent.newCupon(i);
            const newKintos = RewardsComponent.reduceKintos(RewardsComponent.info[i].price, RewardsComponent.userKintos);
            RewardsComponent.kintos.set(newKintos);
            alert("Hemos agregado la promoción a tu cartera");
          }else {
            // console.log("No se esta imprimiendo");
            alert("No tienes suficientes Kintos ");
          }
        }else {

        }
      });
    }

    retriveCupon(i){
      swal({
        title: RewardsComponent.cuponList[i].name ,
        text: `${RewardsComponent.cuponList[i].description} ${RewardsComponent.cuponList[i].price}
        <img style = 'width: 50px; height:50px;'src = './assets/images/KintosCoin_Icon.svg'>` ,
        imageUrl: RewardsComponent.cuponList[i].logo,
        showCancelButton: true,
        confirmButtonColor: '#86C25C',
        confirmButtonText: 'Utilizar',
        cancelButtonText: 'Cancelar',
        html: true
        // title: 'Sticky Charles' ,
        // text: '$20 MXN descuento en tarro<br>' ,
        // imageUrl: './assets/images/KintosCoin_Icon.svg',
        // showCancelButton: true,
        // confirmButtonColor: '#86C25C',
        // confirmButtonText: 'Utilizar',
        // cancelButtonText: 'Cancelar',
        // html: true
      },
      function(isConfirm){
        if (isConfirm) {
          alert('Gracias por utilizar tu cupón, disfruta tu recompensa');
          RewardsComponent.eliminateCupon(i);
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
