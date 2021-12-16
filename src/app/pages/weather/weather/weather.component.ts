import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { WeatherInputStateService } from '../@shared/weather-input-state.service';
import { WeatherService } from '../@shared/weather.service';
import { Weather } from '../@shared/interface';

@Component({
    selector: 'app-weather',
    templateUrl: './weather.component.html',
    styleUrls: ['./weather.component.scss'],
    providers: [WeatherInputStateService]
})
export class WeatherComponent implements OnInit {
    public inputForm: FormGroup;
    public cities?: Weather[];
    public isValid: boolean = true;

    public constructor(
        private weatherService: WeatherService,
        private inputState: WeatherInputStateService
    ) { }

    public ngOnInit(): void {
        this.getList();
        this.inputForm = this.inputState.initForm();
    }

    public async getList(): Promise<any> {
        this.cities = await this.weatherService.getCities$().toPromise();
        const promises = this.cities.map(async (n: Weather) => {
            const geo = await this.weatherService.getGeographic$(n.city).toPromise();
            return this.weatherService.getWeather$(geo);
        });

        Promise.all(promises).then((result: any) => {
            this.cities = result;
        });
    }

    public delete(city: Weather, $event: any): void {
        this.weatherService.deleteCity$(city.id).subscribe();
        this.cities = this.cities.filter(c => c !== city);
        $event.preventDefault();
    }

    public async onSubmit(city: string): Promise<any> {
        city = city.trim();
        if (!(city)) {
            this.isValid = false;
            return;
        }
        city = city[0].toUpperCase() + city.slice(1);

        const geo = await this.weatherService.getGeographic$(city).toPromise();
        const newCity = await this.weatherService.getWeather$(geo);
        await this.weatherService.addCity$(newCity).toPromise();
        this.cities.push(newCity);
    }
}
