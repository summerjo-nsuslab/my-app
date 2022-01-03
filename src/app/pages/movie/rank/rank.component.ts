import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MovieService } from '../@shared/movie.service';
import { BoxOffice } from '../@shared/interface';

@Component({
    selector: 'app-rank',
    templateUrl: './rank.component.html',
    styleUrls: ['./rank.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RankComponent implements OnInit {
    public Math: any;
    public boxOfficeList: BoxOffice[];

    public constructor(
        private ChangeDetectorRef: ChangeDetectorRef,
        private movieService: MovieService
    ) {
        this.Math = Math;
    }

    public ngOnInit(): void {
        this.getBoxOffice().then();
        this.movieService.setTitle.next('BOXOFFICE');
    }

    public async getBoxOffice() {
        try {
            this.boxOfficeList = await this.movieService.getBoxOffice();
        } catch (err) {
            console.error(err);
        } finally {
            this.ChangeDetectorRef.markForCheck();
        }
    }
}
