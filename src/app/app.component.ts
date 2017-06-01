import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  amount: number;
  duration: number;
  total: string;
  fee: number;
  ntotal: number;
  stuff:number;
  display: string;

  constructor() {
    this.amount = 150;
    this.duration = 5;
    this.fee = .016;
    this.display = ` $ ${this.amount} / ${this.duration} días`;
    this.total = `$ ${this.amount * (1 + this.fee)} con ${this.fee * 100}%`;
  }

  changeDuration(value1, value2) {
    this.amount = value1;
    this.duration = value2;
    this.ntotal = (value1 * this.fee * value2);
    this.stuff = this.ntotal + this.amount;

    this.total = `$ ${this.amount * (1 + this.fee)} con ${this.fee * 100}%`;
    this.display = ` $ ${this.amount} / ${this.duration} días`;
  }

  submitLoan () {
    // Metodo para hacer el submit a la base de datos de los creditos
    console.log('Hola');
  }

  changeSlider(){
    console.log('holi');
  }
}
