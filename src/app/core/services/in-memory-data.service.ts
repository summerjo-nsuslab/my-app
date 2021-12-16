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
            // { id: 1, city: 'Seoul' },
            { id: 2, city: 'Santiago' },
            // { id: 3, city: 'London' },
            { id: 1, city: 'Berlin' }
        ];
        return { cities };
    }
}
