import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { RewardsComponent } from './components/rewards/rewards.component';
import { HomeComponent } from './components/home/home.component';

import { routing } from './app.routing';


@NgModule({
  declarations: [
    AppComponent,
    RewardsComponent,
    HomeComponent
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
