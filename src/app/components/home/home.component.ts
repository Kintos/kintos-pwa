import { Component } from '@angular/core';

@Component({
    moduleId : module.id,
    selector : 'home',
    templateUrl : './home.component.html',
    styleUrls : ['./home.component.css']
})

export class HomeComponent {

  amount: number;
  duration: number;
  total: string;

  constructor() {
    this.amount = 150;
    this.duration = 5;
    
  }

  submitLoan () {
    // Metodo para hacer el submit a la base de datos de los creditos
    console.log('Hola');
  }

  changeSlider() {
    console.log('holi');
  }

}
