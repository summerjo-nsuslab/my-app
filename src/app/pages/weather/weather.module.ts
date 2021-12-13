import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { WeatherRoutingModule } from './weather-routing.module';
import { WeatherComponent } from './weather/weather.component';
import { WeatherDetailComponent } from './weather-detail/weather-detail.component';

@NgModule({
    declarations: [
        WeatherComponent,
        WeatherDetailComponent
    ],
    imports: [
        SharedModule,
        WeatherRoutingModule
    ]
})
export class WeatherModule { }
