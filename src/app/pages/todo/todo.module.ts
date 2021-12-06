import { NgModule } from '@angular/core';

import { TodoRoutingModule } from './todo-routing.module';
import { TodoListComponent } from './todo-list/todo-list.component';
import { InputComponent } from './input/input.component';
import { ListComponent } from './list/list.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    declarations: [
        TodoListComponent,
        InputComponent,
        ListComponent
    ],
    imports: [
        SharedModule,
        TodoRoutingModule
    ]
})
export class TodoModule { }
