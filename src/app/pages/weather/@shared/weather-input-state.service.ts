import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class WeatherInputStateService {
    private inputForm: FormGroup;

    public initForm() {
        this.inputForm = new FormGroup({
            city: new FormControl(null, [Validators.required])
        });

        return this.inputForm;
    }
}
