import { ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { Component } from '@angular/core';
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
    info: Reward[] = [];

    constructor(db: AngularFireDatabase){
      //this.title = "Sticky";
      //this.description = "10% de descuento en tu Subway <br> Solo en ITESM Campus Guadalajara <br> - No aplica con otras promociones <br>- No aplica en subway del día <br>Valido hasta 19 de Agosto del 2017 <br> 50 <img style = 'width: 50px; height:50px;'src = './assets/images/KintosCoin_Icon.svg'>";
      this.items = db.list('/rewards');
      db.list('/rewards', { preserveSnapshot: true})
        .subscribe(snapshots=>{
        snapshots.forEach(snapshot => {
          this.info.push(snapshot.val());
        });
      })


      console.log(this.info);
    }

    showModal(i){
      swal({
      title: this.info[i].name ,
      text: this.info[i].description,
      imageUrl: "./assets/images/logo-72.png",
      showCancelButton: true,
      confirmButtonColor: "#86C25C",
      confirmButtonText: "Comprar",
      cancelButtonText: "Cancelar",
      html:true
      });
    }


}
  interface Reward {
      name: String;
      brief: String;
      description: String;
      price: Number;
  }
