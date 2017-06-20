import { Component } from '@angular/core';

import { FirebaseService } from '../../services/firebase.service';

declare var Card: any;
declare var Hashes: any;
declare var swal: any;

@Component({
   moduleId: module.id,
   selector: 'payment',
   templateUrl: './payment.component.html',
   styleUrls: ['./payment.component.css']
})


export class PaymentComponent {

    constructor(public fs : FirebaseService) {
        // console.log(this.fs.readUser())
    }

    ngOnInit() {
    
       new Card({
          form: document.querySelector('form'),
          container: '.card-wrapper',
          width: 200, // optional — default 350px
          formatting: true, // optional - default true
          placeholders: {
            number: '•••• •••• •••• ••••',
            name: 'Nombre completo ',
            expiry: '••/••••',
            cvc: '•••'
          },
           masks: {
                cardNumber: '•' // optional - mask card number
            }
        });
    }

    saveCard(){
        let number = btoa((document.getElementById("number") as HTMLInputElement).value);
        let name   = btoa((document.getElementById("name") as HTMLInputElement).value);
        let expiry = btoa((document.getElementById("expiry") as HTMLInputElement).value);
        let cvc    = btoa((document.getElementById("cvc") as HTMLInputElement).value);

        if(number=="" || number.length<16){
            swal("Ups!","Ingresa el numero completo", "error")
            return;
        }

        if(name=="" || name.length < 3){
            swal("Ups!","Ingresa tu nombre completo", "error")
        }

        if(expiry=="" || expiry.length<6){
            swal("Ups!","Ingresa el formato de fecha correcto", "error")
            return;
        }

        if(cvc=="" || cvc.length < 3){
            swal("Ups!","Ingresa el CVV correcto", "error")
        }

        this.fs.saveCard(number, name, expiry, cvc)
        swal("Listo!","Tu tarjeta ha sido actualizada", "success")
    }

}
