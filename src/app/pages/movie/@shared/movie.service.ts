import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { lastValueFrom, Subject } from 'rxjs';
import * as moment from 'moment';

import {
    BoxOffice,
    BoxOfficeDTO,
    MovieInfo,
    SearchMovieDTO
} from './interface';
import { genreList } from './genres';

@Injectable({
    providedIn: 'any'
})
export class MovieService {
    private kobisBaseURL: string = `http://kobis.or.kr/kobisopenapi/webservice/rest/`;
    private kobisKey: string = `key=08768803a45c2bc7fbbd39cd0d0a99ba`;
    private tmdbBaseURL: string = `https://api.themoviedb.org/3/`;
    private tmdbKey: string = `?api_key=08338782fe0647f70585efb62131a71d`;

    public constructor(
        private http: HttpClient
    ) { }

    public setTitle = new Subject<string>();

    public async getBoxOffice(): Promise<BoxOffice[]> {
        const arr: BoxOffice[] = [];
        const today: string = moment().add(-1, 'd').format('YYYYMMDD');
        const boxOfficeURL: string = `${this.kobisBaseURL}boxoffice/searchDailyBoxOfficeList.json?${this.kobisKey}&targetDt=${today}`;
        try {
            const getBoxOffice = await lastValueFrom(this.http.get<BoxOfficeDTO>(boxOfficeURL));
            const dailyBoxOffice = getBoxOffice.boxOfficeResult.dailyBoxOfficeList;

            dailyBoxOffice.forEach(data => {
                arr.push({
                    rank: data.rank,
                    rankInten: Number(data.rankInten),
                    rankOldAndNew: data.rankOldAndNew,
                    movieCd: data.movieCd,
                    movieNm: data.movieNm
                });
            });
            return arr;
        } catch (err) {
            console.error(err);
            return arr;
        }
    }

    public async searchMovie(query: string, page: number): Promise<MovieInfo> {
        const url: string = `${this.tmdbBaseURL}search/movie${this.tmdbKey}&query=${query}&language=ko&page=${page}`;
        const searchResult = await lastValueFrom(this.http.get<SearchMovieDTO>(url));
        const totalPage: number = searchResult.total_pages;
        console.log(searchResult);
        const arr: MovieInfo = { movie: [], pages: totalPage };

        searchResult.results.forEach(data => {
            arr.movie.push({
                poster: data.poster_path,
                adult: data.adult,
                overview: data.overview ? data.overview : '미리보기 내용이 없습니다.',
                release_date: moment(data.release_date).format('YYYY'),
                genre: this.getGenres(data.genre_ids),
                id: data.id,
                title: data.title,
                backdrop_path: data.backdrop_path,
                vote: data.vote_average
            });
        });
        return arr;
    }

    private getGenres(genreID: Array<number>): any {
        const arr: Array<string> = [];
        genreID.forEach((id) => {
            const test = genreList.find(list => list.id === id).name;
            arr.push(test);
        });
        return arr;
    }
}
