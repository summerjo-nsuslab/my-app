import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { WeatherService } from '../@shared/weather.service';
import { Weather } from '../@shared/interface';

@Component({
    selector: 'app-weather-detail',
    templateUrl: './weather-detail.component.html',
    styleUrls: ['./weather-detail.component.scss']
})
export class WeatherDetailComponent implements OnInit {
    public weatherInfo: Weather;

    public constructor(
        private route: ActivatedRoute,
        private location: Location,
        private weatherService: WeatherService
    ) { }

    public ngOnInit(): void {
        this.getWeather().then();
    }

    public goBack(): void {
        this.location.back();
    }

    private async getWeather(): Promise<void> {
        const city = this.route.snapshot.paramMap.get('city');
        const geo = await this.weatherService.getGeographic(city);
        this.weatherInfo = await this.weatherService.getWeather(geo);
    }
}
