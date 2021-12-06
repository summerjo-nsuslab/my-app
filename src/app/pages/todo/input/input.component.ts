import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ItemService } from '../@shared/item.service';
import { TodoInputStateService } from '../todo-list/todo-input-state.service';

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss'],
    providers: [TodoInputStateService]
})
export class InputComponent implements OnInit {
    public inputForm: FormGroup;

    public constructor(
        private inputState: TodoInputStateService,
        private itemService: ItemService
    ) {
    }

    public ngOnInit(): void {
        this.inputForm = this.inputState.initForm();
    }

    public onSubmit() {
        if (!this.inputForm || !this.inputForm.value['item']) return;
        const dto = this.inputState.toDto();
        this.itemService.add(dto);
        this.inputForm.get('item').setValue('');
    }
}
