import { Component, OnInit } from '@angular/core';
import { MovieService } from '../@shared/movie.service';
import { BoxOffice } from '../@shared/interface';

@Component({
    selector: 'app-rank',
    templateUrl: './rank.component.html',
    styleUrls: ['./rank.component.scss']
})
export class RankComponent implements OnInit {
    public Math: any;
    public boxOfficeList: BoxOffice[];
    public constructor(
        private movieService: MovieService
    ) {
        this.Math = Math;
    }

    public ngOnInit(): void {
        this.getBoxOffice().then();
    }

    public async getBoxOffice() {
        this.boxOfficeList = await this.movieService.getBoxOffice();
    }
}
