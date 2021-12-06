import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { TodoItem } from './interface';

@Injectable({
    providedIn: 'any'
})
export class ItemService {
    private todoList = new Subject<TodoItem>();
    public todoListObservable$ = this.todoList.asObservable();

    public constructor() { }

    public add(item: TodoItem) {
        this.todoList.next(item);
    }
}
