import { Component, Inject, OnInit } from '@angular/core';

import { DOCUMENT } from '@angular/common';
import { TodoItem } from '../@shared/interface';
import { TodoService } from '../@shared/todo.service';
import { ItemService } from '../@shared/item.service';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
    public todoList?: TodoItem[];

    public constructor(
        @Inject(DOCUMENT) private document: Document,
        private todoService: TodoService,
        private itemService: ItemService
    ) {
        this.update();
    }

    public ngOnInit(): void {
        this.getItems();
    }

    public edit(element: HTMLElement) {
        const $item = this.document.querySelectorAll('li[data-editable]');
        $item.forEach(i => {
            const _i = i as HTMLElement;
            _i.dataset['editable'] = 'false';
            if (_i === element) _i.dataset['editable'] = 'true';
        });
    }

    public async completed(item: TodoItem) {
        item.completed = !item.completed;
        await this.todoService.update(this.todoList);
    }

    public async save(element: HTMLElement, item: TodoItem, itemTitle: HTMLInputElement) {
        element.dataset['editable'] = 'false';
        item.title = itemTitle.value;
        await this.todoService.update(this.todoList);
    }

    public async delete(item: TodoItem) {
        this.todoList = this.todoList.filter(x => x !== item);
        await this.todoService.delete(this.todoList);
    }

    private getItems() {
        this.todoList = this.todoService.getItems();
    }

    private update() {
        this.itemService.todoListObservable$
            .subscribe(
                async item => {
                    this.todoList.push(item);
                    await this.todoService.update(this.todoList);
                }
            );
    }
}
