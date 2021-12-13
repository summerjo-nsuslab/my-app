import { Injectable } from '@angular/core';

import { InMemoryDbService } from 'angular-in-memory-web-api';

import { City } from '../../pages/weather/@shared/interface';

@Injectable({
    providedIn: 'any'
})
export class InMemoryDataService implements InMemoryDbService {
    public constructor() { }

    public createDb() {
        const cities: City[] = [
            { id: 1, city: 'Seoul' },
            { id: 2, city: 'Santiago' },
            { id: 3, city: 'London' },
            { id: 4, city: 'Berlin' }
        ];
        return { cities };
    }

    public genId(cities: City[]):number {
        return cities.length + 1;
    }
}
