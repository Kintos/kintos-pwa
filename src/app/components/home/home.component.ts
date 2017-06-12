// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// //import { FirebaseService } from '../../services/firebase.service';
// import {ViewChild} from '@angular/core';
import {Component, OnInit, AfterViewChecked, ElementRef, ViewChild} from '@angular/core';
import { AuthService } from "../../services/auth.service";
import {FirebaseListObservable} from "angularfire2";

@Component({
    moduleId : module.id,
    selector : 'home',
    templateUrl : './home.component.html',
    styleUrls : ['./home.component.css']
})

export class HomeComponent { @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  public newMessage: string;
  public messages: FirebaseListObservable<any>;

  constructor(public afService: AuthService) {
    this.messages = this.afService.messages;
  }

  ngOnInit() {}

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }

  sendMessage(){
    this.afService.sendMessage(this.newMessage);
    this.newMessage = '';
  }

  isYou(email) {
    if(email == this.afService.email)
      return true;
    else
      return false;
  }

  isMe(email) {
    if(email == this.afService.email)
      return false;
    else
      return true;
  }

  submitLoan(){
    var amountAsked = document.getElementById("left").nodeValue
    console.log(amountAsked)
    console.log("loan sent!")
  }
}
