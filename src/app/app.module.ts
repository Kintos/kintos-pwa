import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AngularFireModule } from 'angularfire2';

import { AuthService } from './services/auth.service';
import { LoanRequestService } from './services/loan-request.service'

import { AppComponent } from './app.component';

import { RewardsComponent } from './components/rewards/rewards.component';
import { HomeComponent } from './components/home/home.component';
import { PaymentComponent } from './components/payment/payment.component';
import { MovementsComponent } from './components/movements/movements.component';
import { HelpComponent } from './components/help/help.component';
import { SettingsComponent } from './components/settings/settings.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

import { routing } from './app.routing';

export const firebaseConfig = {
    apiKey: "AIzaSyAgp4PCxzZXUegrJx3LnwFn-a-xa7lqbUg",
    authDomain: "kintos-97029.firebaseapp.com",
    databaseURL: "https://kintos-97029.firebaseio.com",
    projectId: "kintos-97029",
    storageBucket: "kintos-97029.appspot.com",
    messagingSenderId: "660193937556"
  };

@NgModule({
  declarations: [
    AppComponent,
    RewardsComponent,
    HomeComponent,
    PaymentComponent,
    MovementsComponent,
    HelpComponent,
    SettingsComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [AuthService, LoanRequestService],
  bootstrap: [AppComponent]
})

export class AppModule { }
