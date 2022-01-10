import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import * as moment from 'moment';

import { MovieService } from '../@shared/movie.service';
import { MovieInfo } from '../@shared/interface';

@Component({
    selector: 'app-search-result',
    templateUrl: './search-result.component.html',
    styleUrls: ['./search-result.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResultComponent implements OnInit {
    public searchResult: MovieInfo[] = [];
    public pages: number[] = [];
    public totalPage: number;
    public activePage: number;

    public constructor(
        private route: ActivatedRoute,
        private router: Router,
        private ChangeDetectorRef: ChangeDetectorRef,
        private movieService: MovieService
    ) {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }

    public ngOnInit(): void {
        this.getResult().then();
    }

    private async getResult() {
        const query: string = this.route.snapshot.paramMap.get('query');
        this.activePage = Number(this.route.snapshot.paramMap.get('page'));
        try {
            const result = await this.movieService.searchMovie(query, this.activePage);

            result.results.forEach((data: any) => {
                this.searchResult.push({
                    poster: data.poster_path,
                    overview: data.overview ? data.overview : '미리보기 내용이 없습니다.',
                    release_date: moment(data.release_date).format('YYYY'),
                    genre: this.movieService.getGenres(data.genre_ids),
                    title: data.title,
                    vote: data.vote_average
                });
            });
            this.totalPage = result.total_pages;
            this.setPagination();
        } catch (err) {
            console.error(err);
        } finally {
            this.movieService.setTitle.next(`'${query}' 검색 결과`);
            this.ChangeDetectorRef.markForCheck();
        }
    }

    private setPagination() {
        const arr: number[] = [];
        const totalPage: number = this.totalPage;
        const pageCount: number = 10;
        const pageGroup: number = Math.ceil(this.activePage / pageCount);
        const last: number = pageGroup * pageCount < totalPage ? pageGroup * pageCount : totalPage;
        const first: number = last - (pageCount - 1) <= 0 ? 1 : last - (pageCount - 1);

        for (let i = first; i <= last; i++) {
            arr.push(i);
        }
        this.pages = arr;
    }
}
