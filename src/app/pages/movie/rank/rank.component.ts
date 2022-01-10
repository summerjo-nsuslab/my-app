import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';

import * as moment from 'moment';

import { MovieService } from '../@shared/movie.service';
import { BoxOffice, MovieInfo } from '../@shared/interface';

@Component({
    selector: 'app-rank',
    templateUrl: './rank.component.html',
    styleUrls: ['./rank.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RankComponent implements OnInit {
    public boxOfficeList: BoxOffice[] = [];

    public constructor(
        private ChangeDetectorRef: ChangeDetectorRef,
        private movieService: MovieService
    ) { }

    public async ngOnInit(): Promise<void> {
        await this.getBoxOffice();
        this.movieService.setTitle.next(`BOXOFFICE`);
    }

    public async getBoxOffice() {
        const boxOfficeList: BoxOffice[] = [];
        try {
            const today: string = moment().add(-1, 'd').format('YYYYMMDD');
            const getBoxOffice = await this.movieService.getBoxOffice(today);
            const dailyBoxOfficeList = getBoxOffice.boxOfficeResult.dailyBoxOfficeList;

            dailyBoxOfficeList.forEach(data => {
                boxOfficeList.push({
                    rank: data.rank,
                    rankInten: Math.abs(Number(data.rankInten)),
                    movieNm: data.movieNm,
                    movieStatusType: this.checkStatus(data.rankOldAndNew, data.rankInten)
                });
            });

            const promises = boxOfficeList.map(async m => {
                return this.getDetail(m.movieNm);
            });

            await Promise.all(promises).then((result) => {
                for (let i = 0; i < boxOfficeList.length; i++) {
                    this.boxOfficeList.push({ ...boxOfficeList[i], ...result[i] });
                }
            });
        } catch (err) {
            console.error(err);
        } finally {
            this.ChangeDetectorRef.markForCheck();
        }
    }

    private async getDetail(movieNm: string): Promise<MovieInfo | void> {
        try {
            const result = await this.movieService.searchMovie(movieNm);
            return {
                poster: result.results[0].poster_path,
                overview: result.results[0].overview ? result.results[0].overview : '미리보기 내용이 없습니다.',
                release_date: moment(result.results[0].release_date).format('YYYY'),
                genre: this.movieService.getGenres(result.results[0].genre_ids),
                vote: result.results[0].vote_average
            };
        } catch (err) {
            return console.error(err);
        } finally {
            this.ChangeDetectorRef.markForCheck();
        }
    }

    public checkStatus(oldAndNew: string, rankInten: string): string {
        if ('NEW' === oldAndNew) {
            return 'new';
        }

        if (Number(rankInten) > 0) {
            return 'up';
        }

        if (Number(rankInten) < 0) {
            return 'down';
        }

        return 'normal';
    }
}
