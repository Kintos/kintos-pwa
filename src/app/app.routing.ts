import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { AppComponent } from './app.component';

import { HomeComponent } from './components/home/home.component';
import { RewardsComponent } from './components/rewards/rewards.component';
import { PaymentComponent } from './components/payment/payment.component';
import { MovementsComponent } from './components/movements/movements.component';
import { HelpComponent } from './components/help/help.component';
import { SettingsComponent } from './components/settings/settings.component';


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
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);