// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// //import { FirebaseService } from '../../services/firebase.service';
// import {ViewChild} from '@angular/core';

import {Component, OnInit, AfterViewChecked, ElementRef, ViewChild} from '@angular/core';
import { AuthService } from "../../services/auth.service";
import {AngularFire, AuthProviders, AuthMethods, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import { LoanRequestService } from "../../services/loan-request.service";
import { FirebaseService } from "../../services/firebase.service";

declare var firebase : any;

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
   var database = firebase.database();
  //  console.log(database)
    firebase.ref('/registeredUsers/xvKDxHWqMlgvMBsV3GyvL8v0rz93').child.once('value'), (snapshot) => {
      var isActive = snapshot.val().loan;
      console.log(isActive)
      console.log(this.isAvailable)
      // this.setAvailability.bind(isActive);
      if(String(isActive) == "inactive"){
        this.isAvailable = true;
      }else{
        this.isAvailable = false;
      }
    };
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

  submitLoan(){
     let loan = (document.getElementById("left") as HTMLLabelElement).textContent;
     let toPay = (document.getElementById("right") as HTMLLabelElement).textContent;
     let expDate = (document.getElementById("date") as HTMLLabelElement).textContent;
     let askedDate = String (new Date())

     this.insertLoanService.insertLoanToDB(loan, toPay, expDate, askedDate);
  }
}
