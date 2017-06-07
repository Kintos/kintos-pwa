import { ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { Component } from '@angular/core';

@Component({
   moduleId: module.id,
   selector: 'rewards',
   templateUrl: './rewards.component.html',
   styleUrls: ['./rewards.component.css']
})

export class RewardsComponent {
    @ViewChild('dialog_reward') dialog: ElementRef;
    constructor() {

    }

    ngOnInit() {

    }

    showDialog() {
      console.log('hola');
      this.dialog.nativeElement.showModal();
    }

}
