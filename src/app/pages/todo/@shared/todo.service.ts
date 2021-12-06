import { Injectable } from '@angular/core';

import { TodoRepositoryService } from './todo-repository.service';
import { TodoItem } from './interface';

@Injectable({
    providedIn: 'any'
})
export class TodoService {
    public constructor(private todoRepositoryService: TodoRepositoryService) { }

    public getItems() {
        return this.todoRepositoryService.getItems();
    }

    public async update(items: TodoItem[]) {
        await this.todoRepositoryService.update(items);
    }

    public async delete(items: TodoItem[]) {
        await this.todoRepositoryService.delete(items);
    }
}
