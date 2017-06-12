import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { AppComponent } from './app.component';

import { HomeComponent } from './components/home/home.component';
import { RewardsComponent } from './components/rewards/rewards.component';
import { PaymentComponent } from './components/payment/payment.component';
import { MovementsComponent } from './components/movements/movements.component';
import { HelpComponent } from './components/help/help.component';
import { SettingsComponent } from './components/settings/settings.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';



const appRoutes: Routes = [
    {
        path:'',
        component: HomeComponent
    },
    {
        path: 'rewards',
        component: RewardsComponent
    },
    {
        path: 'payment',
        component: PaymentComponent
    },
    {
        path: 'movements',
        component: MovementsComponent
    },
    {
        path: 'help',
        component: HelpComponent
    },
    {
        path: 'settings',
        component: SettingsComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: SignupComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);