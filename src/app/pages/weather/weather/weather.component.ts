import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { WeatherInputStateService } from '../@shared/weather-input-state.service';
import { WeatherService } from '../@shared/weather.service';
import { City } from '../@shared/interface';

@Component({
    selector: 'app-weather',
    templateUrl: './weather.component.html',
    styleUrls: ['./weather.component.scss'],
    providers: [WeatherInputStateService]
})
export class WeatherComponent implements OnInit {
    public inputForm: FormGroup;
    public cities?: City[];
    public isValid: boolean = true;

    public constructor(
        private weatherService: WeatherService,
        private inputState: WeatherInputStateService
    ) { }

    public ngOnInit(): void {
        this.getList();
        this.inputForm = this.inputState.initForm();
    }

    public getList(): void {
        this.weatherService.getCities$()
            .subscribe(
                city => {
                    this.cities = city;
                }
            );
    }

    public delete(city: City, $event: any): void {
        this.weatherService.deleteCity$(city.id).subscribe();
        this.cities = this.cities.filter(c => c !== city);
        $event.preventDefault();
    }

    public onSubmit(city: string): void {
        city = city.trim();
        this.isValid = !!(city);
        if (!this.isValid) return;

        this.weatherService.addCity$(city)
            .subscribe(
                city => {
                    this.cities.push(city);
                },
                () => {
                    this.isValid = false;
                }
            );
    }
}
