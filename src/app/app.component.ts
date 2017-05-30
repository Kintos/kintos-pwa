import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  amount: number;
  duration: number;
  total: number;
  fee: number;
  display: string;

  constructor() {
    this.amount = 150;
    this.duration = 5;
    this.fee = .30;
  }

  changeDuration(value1, value2) {
    this.amount = value1;
    this.duration = value2;
    this.total = this.amount  * (1 + this.fee);
    this.display = ` $ ${this.amount} / ${this.duration} días`;
  }


}
