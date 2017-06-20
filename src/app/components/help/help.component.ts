import { Component } from '@angular/core';
import { Collapse } from '../movements/collapse.directive';
@Component({
   moduleId: module.id,
   selector: 'help',
   templateUrl: './help.component.html',
   styleUrls: ['./help.component.css'],
})

export class HelpComponent {
    public isCollapsedContent = false;
    constructor() {

    }

    ngOnInit() {

    }

}
