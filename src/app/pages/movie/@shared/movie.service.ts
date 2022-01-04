import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, lastValueFrom } from 'rxjs';
import * as moment from 'moment';

import {
    BoxOffice,
    BoxOfficeDTO,
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

    public setTitle = new BehaviorSubject<string>('BOXOFFICE');

    public async getBoxOffice(): Promise<BoxOffice[]> {
        const arr: BoxOffice[] = [];
        // today는 파라미터로 받기
        const today: string = moment().add(-1, 'd').format('YYYYMMDD');
        const boxOfficeURL: string = `${this.kobisBaseURL}boxoffice/searchDailyBoxOfficeList.json?${this.kobisKey}&targetDt=${today}`;
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
    }

    public async searchMovie(query: string, page: number): Promise<SearchMovieDTO> {
        const url: string = `${this.tmdbBaseURL}search/movie${this.tmdbKey}&query=${query}&language=ko&page=${page}`;
        return lastValueFrom(this.http.get<SearchMovieDTO>(url));
    }

    public getGenres(genreID: Array<number>): any {
        const arr: Array<string> = [];
        genreID.forEach((id) => {
            const test = genreList.find(list => list.id === id).name;
            arr.push(test);
        });
        return arr;
    }
}
