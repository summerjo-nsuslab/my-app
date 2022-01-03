import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from './@shared/movie.service';

@Component({
    selector: 'app-movie',
    templateUrl: './movie.component.html',
    styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
    public title: string;

    public constructor(
        private route: ActivatedRoute,
        private router: Router,
        private movieService: MovieService
    ) {
    }

    public ngOnInit(): void {
        this.movieService.setTitle.subscribe({
            next: (value) => {
                this.title = value;
            }
        });
    }
}
