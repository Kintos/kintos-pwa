
import {Component, OnInit, AfterViewChecked, ElementRef, ViewChild} from '@angular/core';
import { AuthService } from "../../services/auth.service";
import {AngularFire, AuthProviders, AuthMethods, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import { LoanRequestService } from "../../services/loan-request.service";
import { FirebaseService } from "../../services/firebase.service";

// declare var firebase : any;
declare var swal: any;

@Component({
    moduleId : module.id,
    selector : 'home',
    templateUrl : './home.component.html',
    styleUrls : ['./home.component.css']
})

export class HomeComponent { @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  // public newMessage: string;
  // public messages: FirebaseListObservable<any>;
  public loanActive: String;
  public info: String;
  public showCard = false;
  lastPage: any;

  constructor(public af: AngularFire,
              public afService: AuthService,
              public insertLoanService: LoanRequestService,
              public firebaseService: FirebaseService) {


     this.af.auth.subscribe(
        (auth) => {
          if (auth != null) {
            this.af.database.object('/registeredUsers/' + auth.uid + '/asLoan', { preserveSnapshot: true })
            .subscribe(snapshot => {
              this.loanActive = snapshot.val();
              if (this.loanActive === 'active') {
                this.showCard = true;
              }
              //console.log(this.loanActive);
            });
          }
        });
      this.lastPage = document.referrer;
      console.log(this.lastPage);
      if (this.lastPage.indexOf('/register') !== -1){
        swal('Bienvenido', 'Como regalo de primer ingreso revisa tu cartera para revisar tu recompensa');
      }
  }

  ngOnInit() {

  }

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

  // submitLoan(){
  //    if(this.loanActive === 'active') {
  //     swal('Prestamo pendiente de pago', 'Para poder disponer de más prestamos, realiza tu pago pendiente', 'error');
  //    }else {
  //     this.approvedLoad();
  //    }
  // }

  submitLoan(){
    let loan = (document.getElementById("left") as HTMLLabelElement).textContent;
    let toPay = (document.getElementById("right") as HTMLLabelElement).textContent;
    let expDate = (document.getElementById("date") as HTMLLabelElement).textContent;
    let currentDate = new Date();
    let askedDate = String (this.DayAsString(currentDate.getDay()) + ", " + currentDate.getDate() + " " + this.MonthAsString(currentDate.getMonth()) + " " + currentDate.getFullYear())
    this.insertLoanService.insertLoanToDB(loan, toPay, expDate, askedDate);
  }
}
