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

    public async ngOnInit(): Promise<void> {
        await this.getBoxOffice();
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
