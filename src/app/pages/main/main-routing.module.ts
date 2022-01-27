import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main/main.component';
import { WeatherDetailComponent } from '../weather/weather-detail/weather-detail.component';

const routes: Routes = [
    {
        path: 'detail/:id',
        component: WeatherDetailComponent
    },
    {
        path: '',
        component: MainComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule { }
