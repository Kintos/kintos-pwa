import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { RewardsComponent } from './components/rewards/rewards.component';

const appRoutes: Routes = [
    {
        path:'',
        component: HomeComponent
    },
    {
        path: 'rewards',
        component: RewardsComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);