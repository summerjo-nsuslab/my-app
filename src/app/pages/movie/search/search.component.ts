import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { MovieInputStateService } from '../@shared/movie-input-state.service';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
    providers: [MovieInputStateService]
})
export class SearchComponent implements OnInit {
    public inputForm: FormGroup;

    public constructor(
        private router: Router,
        private inputState: MovieInputStateService
    ) { }

    public ngOnInit(): void {
        this.inputForm = this.inputState.initForm();
    }

    public async onSubmit(query: string) {
        await this.router.navigate([`movie/search/${query}/page/1`]);
    }
}
