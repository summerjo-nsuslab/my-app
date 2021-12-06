import { Inject, Injectable } from '@angular/core';

import { Observable, of, from } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    public constructor(
        @Inject(DOCUMENT) private document: Document
    ) { }

    public getItems$(key: string): Observable<string | null> {
        return of(this.document.defaultView.localStorage.getItem(key));
    }

    public setItems(key: string, value: any) {
        const converted = JSON.stringify(value);
        this.document.defaultView.localStorage.setItem(key, converted);
        return of(true);
    }

    public update(key: string, value: any) {
        this.setItems(key, value);
    }

    public delete(key: string, value: any) {
        this.setItems(key, value);
    }
}
