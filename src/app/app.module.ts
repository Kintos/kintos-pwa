import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { RewardsComponent } from './components/rewards/rewards.component';
import { HomeComponent } from './components/home/home.component';
import { PaymentComponent } from './components/payment/payment.component';
import { MovementsComponent } from './components/movements/movements.component';
import { HelpComponent } from './components/help/help.component';
import { SettingsComponent } from './components/settings/settings.component';

import { routing } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    RewardsComponent,
    HomeComponent,
    PaymentComponent,
    MovementsComponent,
    HelpComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
