import { ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { Component } from '@angular/core';
declare var swal: any;
@Component({
   moduleId: module.id,
   selector: 'rewards',
   templateUrl: './rewards.component.html',
   styleUrls: ['./rewards.component.css']
})

export class RewardsComponent {
    title: String;

    constructor(){
      this.title = "Sticky";
    }


    showModal(){
      swal({
      title: this.title ,
      text: "10% de descuento en tu Subway <br> Solo en ITESM Campus Guadalajara <br> - No aplica con otras promociones <br>- No aplica en subway del día <br>Valido hasta 19 de Agosto del 2017 <br> 50 <img style = 'width: 50px; height:50px;'src = './assets/images/KintosCoin_Icon.svg'>",
      imageUrl: "./assets/images/logo-72.png",
      showCancelButton: true,
      confirmButtonColor: "#86C25C",
      confirmButtonText: "Comprar",
      cancelButtonText: "Cancelar",
      html:true
      });
    }



}
