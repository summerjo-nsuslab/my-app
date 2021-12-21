import { Injectable } from '@angular/core';

import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Weather } from '../../pages/weather/@shared/interface';

@Injectable({
    providedIn: 'any'
})
export class InMemoryDataService implements InMemoryDbService {
    public constructor() { }

    public createDb() {
        const cities: Weather[] = [
            { id: 1, city: 'Santiago' },
            { id: 2, city: 'Berlin' }
        ];
        return { cities };
    }
}
