import { TestBed } from '@angular/core/testing';

import { WeatherInputStateService } from './weather-input-state.service';

describe('WeatherInputStateService', () => {
    let service: WeatherInputStateService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(WeatherInputStateService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
