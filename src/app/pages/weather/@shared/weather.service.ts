import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
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

    public getCities$(): Observable<Weather[]> {
        return this.http.get<Weather[]>(this.citiesURL);
    }

    public getGeographic$(city: string): Observable<GeographicDTO[]> {
        return this.http.get<GeographicDTO[]>(this.geocodingURL + city + this.urlSuffix);
    }

    public async getWeather$(geo: any): Promise<Weather> {
        const geoURL = `lat=${geo[0].lat}&lon=${geo[0].lon}&exclude=minutely`;
        const getWeather = await this.http.get<WeatherDTO>(this.oneCallWeatherURL + geoURL + this.urlSuffix).toPromise();
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

    public addCity$(newCity: Weather): Observable<any> {
        return this.http.post<Weather>(this.citiesURL, newCity);
    }

    public deleteCity$(id: number): Observable<any> {
        const url = `${this.citiesURL}/${id}`;
        return this.http.delete<Weather>(url, this.httpOptions);
    }

    private getHourly(data: any) {
        const arr: Weather['hourly'] = [];
        const tomorrow = this.getDate().tomorrow;
        tomorrow.setHours(-1);
        const tomorrowTimestamp = tomorrow.getTime() / 1e3;
        data = data.filter((d: any) => d.dt < tomorrowTimestamp);
        data.forEach((data: any) => {
            arr.push({
                time: this.getDate(data.dt).hour,
                temp: Math.round(data.temp),
                weather: data.weather[0].main
            });
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

    private getDate(time?: number) {
        const today = new Date();
        const tomorrow = new Date(today.setDate(today.getDate() + 1));
        const week = ['일', '월', '화', '수', '목', '금', '토'];
        const convert = new Date(time * 1e3);
        const hour = convert.getHours();
        const day = week[convert.getDay()];
        return { hour, day, tomorrow };
    }
}
