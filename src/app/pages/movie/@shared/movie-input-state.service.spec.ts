import { TestBed } from '@angular/core/testing';

import { MovieInputStateService } from './movie-input-state.service';

describe('MovieInputStateService', () => {
    let service: MovieInputStateService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(MovieInputStateService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
