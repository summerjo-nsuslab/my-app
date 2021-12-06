import { TestBed } from '@angular/core/testing';

import { TodoRepositoryService } from './todo-repository.service';

describe('TodoRepositoryService', () => {
    let service: TodoRepositoryService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(TodoRepositoryService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
