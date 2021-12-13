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
        this.getWeather();
    }

    public goBack(): void {
        this.location.back();
    }

    private getWeather(): void {
        const city = this.route.snapshot.paramMap.get('city');
        this.weatherService.getWeather$(city)
            .subscribe(value => {
                this.weatherInfo = {
                    city,
                    temp: value.current.temp,
                    weather: value.current.weather[0].main,
                    minTemp: value.daily[0].temp.min,
                    maxTemp: value.daily[0].temp.max,
                    hourly: this.getHourly(value.hourly),
                    daily: this.getDaily(value.daily)
                };
            });
    }

    private getHourly(data: any) {
        const arr: Weather['hourly'] = [];
        const today = new Date();
        const tomorrow = new Date(today.setDate(today.getDate() + 1));
        tomorrow.setHours(-1);
        const tomorrowTimestamp = tomorrow.getTime() / 1000.0;
        data.forEach((data: any) => {
            if (data.dt < tomorrowTimestamp) {
                arr.push({ time: this.getDate(data.dt).hour, temp: Math.round(data.temp), weather: data.weather[0].main });
            }
        });

        return arr;
    }

    private getDaily(data: any) {
        const arr: Weather['daily'] = [];
        data.forEach((data: any) => {
            arr.push({ day: this.getDate(data.dt).day, temp: Math.round(data.temp.day), weather: data.weather[0].main });
        });
        return arr;
    }

    private getDate(time: number) {
        const week = ['일', '월', '화', '수', '목', '금', '토', '일'];
        const convert = new Date(time * 1e3);
        const hour = convert.getHours();
        const date = convert.getDate();
        const day = week[convert.getDay()];
        return { hour, date, day };
    }
}
