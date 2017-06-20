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
        let number = ((document.getElementById("number") as HTMLInputElement).value);
        let name   = ((document.getElementById("name") as HTMLInputElement).value);
        let expiry = ((document.getElementById("expiry") as HTMLInputElement).value);
        let cvc    = ((document.getElementById("cvc") as HTMLInputElement).value);

        if(number=="" || number.length<16){
            swal("Ups!","Ingresa el numero completo", "error")
            return;
        }

        if(name=="" || name.length<6){
            swal("Ups!","Ingresa tu nombre completo", "error")
            return;
        }

        if(expiry=="" || expiry.length<10){
            swal("Ups!","Ingresa el formato de fecha correcto", "error")
            return;
        }

        if(cvc=="" || cvc.length<3){
            swal("Ups!","Ingresa el CVV correcto", "error")
            return;
        }

        number = btoa(number)
        name   = btoa(name)
        expiry = btoa(expiry)
        cvc    = btoa(cvc)

        this.fs.saveCard(number, name, expiry, cvc)
        swal("Listo!","Tu tarjeta ha sido actualizada", "success")
    }

}
