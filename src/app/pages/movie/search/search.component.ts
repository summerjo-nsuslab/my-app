import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { MovieInputStateService } from '../@shared/movie-input-state.service';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
    providers: [MovieInputStateService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit {
    public inputForm: FormGroup;

    public constructor(
        private router: Router,
        private ChangeDetectorRef: ChangeDetectorRef,
        private inputState: MovieInputStateService
    ) { }

    public ngOnInit(): void {
        this.inputForm = this.inputState.initForm();
    }

    public async onSubmit(query: string) {
        await this.router.navigate([`movie/search/${query}/page/1`]);
        // this.ChangeDetectorRef.markForCheck();
    }
}
