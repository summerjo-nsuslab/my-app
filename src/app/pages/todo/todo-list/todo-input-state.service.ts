import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable()
export class TodoInputStateService {
    private inputForm: FormGroup;

    public initForm() {
        this.inputForm = new FormGroup({
            item: new FormControl(null, [Validators.required])
        });

        return this.inputForm;
    }

    public toDto() {
        return {
            title: this.inputForm.value['item'].trim(),
            completed: false
        };
    }
}
