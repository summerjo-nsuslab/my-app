import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MovieService } from '../@shared/movie.service';
import { MovieInfo } from '../@shared/interface';

@Component({
    selector: 'app-search-result',
    templateUrl: './search-result.component.html',
    styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
    public searchResult: MovieInfo;
    public pages: number[] = [];
    public totalPage: number;
    public activePage: number;

    public constructor(
        private route: ActivatedRoute,
        private router: Router,
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
        this.searchResult = await this.movieService.searchMovie(query, this.activePage);
        this.totalPage = this.searchResult.pages;
        this.setPagination().then();
    }

    private async setPagination() {
        const arr: number[] = [];
        const totalPage: number = this.totalPage;
        const pageCount: number = 10;
        const pageGroup: number = Math.ceil(this.activePage / pageCount);
        const last: number = pageGroup * pageCount < totalPage ? pageGroup * pageCount : totalPage;
        const first: number = last >= totalPage ? 1 : last - pageCount + 1;
        for (let i = first; i <= last; i++) {
            arr.push(i);
        }
        this.pages = arr;
    }
}