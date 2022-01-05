import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { MovieService } from './@shared/movie.service';

@Component({
    selector: 'app-movie',
    templateUrl: './movie.component.html',
    styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
    public title: string;

    public constructor(
        public router: Router,
        private movieService: MovieService
    ) {
    }

    public ngOnInit(): void {
        this.movieService.setTitle.subscribe(
            (value) => {
                this.title = value;
            }
        );
    }
}
