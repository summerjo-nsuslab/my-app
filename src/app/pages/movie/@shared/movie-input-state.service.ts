import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable()
export class MovieInputStateService {
    private inputForm: FormGroup;

    public initForm() {
        this.inputForm = new FormGroup({
            query: new FormControl(null, [
                Validators.required,
                Validators.minLength(2)
            ])
        });

        return this.inputForm;
    }
}
