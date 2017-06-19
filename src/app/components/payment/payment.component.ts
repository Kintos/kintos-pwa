import { Component } from '@angular/core';

import { FirebaseService } from '../../services/firebase.service';

declare var Card: any;

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
        let number = (document.getElementById("number") as HTMLInputElement).value;
        let name = (document.getElementById("name") as HTMLInputElement).value;
        let expiry = (document.getElementById("expiry") as HTMLInputElement).value;
        let cvc = (document.getElementById("cvc") as HTMLInputElement).value;
        console.log("Imhere!"+number+name+expiry+cvc)
    }

}
