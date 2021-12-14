import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable, switchMap, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { City } from './interface';

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

    public getCities$(): Observable<City[]> {
        return this.http.get<City[]>(this.citiesURL)
            .pipe(
                map((result) => {
                    result.forEach(
                        city => {
                            this.getWeather$(city.city)
                                .subscribe(value => {
                                    city.temp = value.current.temp;
                                    city.weather = value.current.weather[0].main;
                                });
                        }
                    );
                    return result;
                }),
                catchError(this.handleError)
            );
    }

    public addCity$(city: string): Observable<any> {
        return this.getWeather$(city)
            .pipe(
                switchMap(value => {
                    const convertCity = city[0].toUpperCase() + city.slice(1);
                    const newCity: City = { city: convertCity, temp: value.current.temp, weather: value.current.weather[0].main };
                    return this.http.post(this.citiesURL, newCity);
                }),
                catchError(this.handleError)
            );
    }

    public deleteCity$(id: number): Observable<any> {
        const url = `${this.citiesURL}/${id}`;
        return this.http.delete<City>(url, this.httpOptions).pipe(
            catchError(this.handleError)
        );
    }

    public getWeather$(city : string): Observable<any> {
        return this.http.get(this.geocodingURL + city + this.urlSuffix)
            .pipe(
                map((value: any) => {
                    return value[0];
                }),
                switchMap((geo) => {
                    const geoURL = `lat=${geo.lat}&lon=${geo.lon}&exclude=minutely`;
                    return this.http.get(this.oneCallWeatherURL + geoURL + this.urlSuffix);
                }),
                catchError(this.handleError)
            );
    }

    private handleError(error: HttpErrorResponse) {
        if (0 === error.status) {
            console.error('Error:', error.error);
        } else {
            console.error(`Backend error ${error.status}`);
        }
        return throwError('예기치 못한 에러가 발생했습니다. 다시 시도해주세요.');
    }
}
