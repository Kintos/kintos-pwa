import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  template: `
   <!--
   <h1>{{title}}</h1>
    <nav>
      <a routerLink="/" routerLinkActive="active">Inicio</a>
      <a routerLink="/rewards" routerLinkActive="active">Recompensas</a>
    </nav>-->
    <router-outlet></router-outlet>
  `
    //templateUrl: './app.component.html',
  //styleUrls: ['./app.component.css']
})

export class AppComponent {
  
}
