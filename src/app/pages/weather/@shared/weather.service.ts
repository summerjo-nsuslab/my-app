import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { lastValueFrom } from 'rxjs';
import * as moment from 'moment';

import { GeographicDTO, Weather, WeatherDTO } from './interface';

@Injectable({
    providedIn: 'any'
})
export class WeatherService {
    private citiesURL: string = 'api/cities';
    private geocodingURL: string = 'http://api.openweathermap.org/geo/1.0/direct?q=';
    private urlSuffix: string = '&units=metric&lang=kr&appid=1e59095ffeb0f870b4f162cba625931d';
    private oneCallWeatherURL: string = 'https://api.openweathermap.org/data/2.5/onecall?';
    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    public constructor(
        private http: HttpClient
    ) { }

    public getCities(): Promise<Weather[]> {
        return lastValueFrom(this.http.get<Weather[]>(this.citiesURL));
    }

    public getGeographic(city: string): Promise<GeographicDTO[]> {
        return lastValueFrom(this.http.get<GeographicDTO[]>(this.geocodingURL + city + this.urlSuffix));
    }

    public async getWeather(geo: GeographicDTO[]): Promise<Weather> {
        const geoURL = `lat=${geo[0].lat}&lon=${geo[0].lon}&exclude=minutely`;
        const getWeather = await lastValueFrom(this.http.get<WeatherDTO>(this.oneCallWeatherURL + geoURL + this.urlSuffix));
        return {
            city: geo[0].name,
            temp: getWeather.current.temp,
            weather: getWeather.current.weather[0].main,
            minTemp: getWeather.daily[0].temp.min,
            maxTemp: getWeather.daily[0].temp.max,
            hourly: this.getHourly(getWeather.hourly),
            daily: this.getDaily(getWeather.daily)
        };
    }

    public addCity(newCity: Weather): Promise<Weather> {
        return lastValueFrom(this.http.post<Weather>(this.citiesURL, newCity));
    }

    public deleteCity(id: number): Promise<Weather> {
        const url = `${this.citiesURL}/${id}`;
        return lastValueFrom(this.http.delete<Weather>(url, this.httpOptions));
    }

    private getHourly(data: WeatherDTO['hourly']) {
        const arr: Weather['hourly'] = [];
        const today = moment().endOf('day');
        const timestamp = Number(today.format('x')) / 1e3;
        data = data.filter(d => d.dt < timestamp);
        data.forEach(data => {
            arr.push({
                time: this.getDate(data.dt).hour,
                temp: Math.round(data.temp),
                weather: data.weather[0].main
            });
        });
        return arr;
    }

    private getDaily(data: WeatherDTO['daily']) {
        const arr: Weather['daily'] = [];
        data.forEach(data => {
            arr.push({ day: this.getDate(data.dt).day, temp: Math.round(data.temp.day), weather: data.weather[0].main });
        });
        return arr;
    }

    private getDate(time: number) {
        const today = moment(time * 1e3);
        const week = ['일', '월', '화', '수', '목', '금', '토'];
        const hour = today.hour();
        const day = week[today.day()];
        return { hour, day };
    }
}
