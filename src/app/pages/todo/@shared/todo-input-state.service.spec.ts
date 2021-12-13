import { TestBed } from '@angular/core/testing';

import { TodoInputStateService } from './todo-input-state.service';

describe('TodoInputStateService', () => {
    let service: TodoInputStateService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(TodoInputStateService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
