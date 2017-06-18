// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// //import { FirebaseService } from '../../services/firebase.service';
// import {ViewChild} from '@angular/core';

import {Component, OnInit, AfterViewChecked, ElementRef, ViewChild} from '@angular/core';
import { AuthService } from "../../services/auth.service";
import {AngularFire, AuthProviders, AuthMethods, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import { LoanRequestService } from "../../services/loan-request.service";
import { FirebaseService } from "../../services/firebase.service";

// declare var firebase : any;

@Component({
    moduleId : module.id,
    selector : 'home',
    templateUrl : './home.component.html',
    styleUrls : ['./home.component.css']
})

export class HomeComponent { @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  // public newMessage: string;
  // public messages: FirebaseListObservable<any>;

  public isAvailable:boolean;

  constructor(public af: AngularFire, 
              public afService: AuthService, 
              public insertLoanService: LoanRequestService, 
              public firebaseService: FirebaseService) {
    
    // console.log(this.isAvailable);        

    //  this.af.auth.subscribe(     
    //     (auth) => {
    //       if (auth != null) {
    //         this.available = this.af.database.object('/registeredUsers/'+auth.uid+'/loan')
    //         this.loanAvailable = this.availableState();
    //       }
    //     });

    //     this.availableState();

    // console.log(this.insertLoanService.loanAvailable())
    // this.loanAvailable = this.insertLoanService.loanAvailable();
    // this.messages = this.afService.messages;
    
    // this.af.auth.subscribe(
    //   (auth) => {
    //     if (auth != null) {
    //       this.userAvailable = this.af.database.object('/registeredUsers/'+auth.uid+'/loan')
    //     }
    //   });
  }

  ngOnInit() { 
  
  }

  // ngAfterViewChecked() {
  //   this.scrollToBottom();
  // }

  // scrollToBottom(): void {
  //   try {
  //     this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
  //   } catch(err) { }
  // }

  // sendMessage(){
  //   this.afService.sendMessage(this.newMessage);
  //   this.newMessage = '';
  // }

  // isYou(email) {
  //   if(email == this.afService.email)
  //     return true;
  //   else
  //     return false;
  // }

  // isMe(email) {
  //   if(email == this.afService.email)
  //     return false;
  //   else
  //     return true;
  // }


  MonthAsString(monthIndex) {
        var d=new Date();
        var month=new Array();
        month[0]="Enero";
        month[1]="Febrero";
        month[2]="Marzo";
        month[3]="Abril";
        month[4]="Mayo";
        month[5]="Junio";
        month[6]="Julio";
        month[7]="Agosto";
        month[8]="Septiembre";
        month[9]="Octubre";
        month[10]="Noviembre";
        month[11]="Diciembre";

        return month[monthIndex];
    }

    DayAsString(dayIndex) {
        var weekdays = new Array(7);
        weekdays[0] = "Domingo";
        weekdays[1] = "Lunes";
        weekdays[2] = "Martes";
        weekdays[3] = "Miercoles";
        weekdays[4] = "Jueves";
        weekdays[5] = "Viernes";
        weekdays[6] = "Sabado";

        return weekdays[dayIndex];
    }
    
  submitLoan(){
     let loan = (document.getElementById("left") as HTMLLabelElement).textContent;
     let toPay = (document.getElementById("right") as HTMLLabelElement).textContent;
     let expDate = (document.getElementById("date") as HTMLLabelElement).textContent;
     let currentDate = new Date()
     let askedDate = String (this.DayAsString(currentDate.getDay()) + ", " + currentDate.getDate() + " " + this.MonthAsString(currentDate.getMonth()) + " " + currentDate.getFullYear())

     this.insertLoanService.insertLoanToDB(loan, toPay, expDate, askedDate);
  }
}
