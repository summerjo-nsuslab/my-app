import { Injectable } from '@angular/core';

import { StorageService } from '../../../core/services/storage.service';
import { TodoItem } from './interface';

@Injectable({
    providedIn: 'any'
})
export class TodoRepositoryService {
    public list?: TodoItem[];
    public constructor(private storageService: StorageService) { }

    public getItems() {
        this.storageService.getItems$('todoList')
            .subscribe(list => {
                this.list = list ? JSON.parse(list) : [];
            });
        return this.list;
    }

    public update(items: TodoItem[]) {
        return new Promise<void>(resolve => {
            this.storageService.update('todoList', items);
            resolve();
        });
    }

    public delete(items: TodoItem[]) {
        return new Promise<void>(resolve => {
            this.storageService.delete('todoList', items);
            resolve();
        });
    }
}
