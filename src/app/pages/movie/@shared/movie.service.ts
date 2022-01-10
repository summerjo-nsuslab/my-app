import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, lastValueFrom } from 'rxjs';

import { environment } from '../../../../environments/environment';
import {
    BoxOfficeDTO,
    SearchMovieDTO
} from './interface';
import { genreList } from './genres';

@Injectable({
    providedIn: 'any'
})
export class MovieService {
    public constructor(
        private http: HttpClient
    ) { }

    public setTitle = new BehaviorSubject<string>('BOXOFFICE');

    public async getBoxOffice(today: string): Promise<BoxOfficeDTO> {
        const boxOfficeURL: string = `${environment.kobisBaseURL}boxoffice/searchDailyBoxOfficeList.json?${environment.kobisKey}&targetDt=${today}`;
        return lastValueFrom(this.http.get<BoxOfficeDTO>(boxOfficeURL));
    }

    public async searchMovie(query: string, page: number = 1): Promise<SearchMovieDTO> {
        const url: string = `${environment.tmdbBaseURL}search/movie${environment.tmdbKey}&query=${query}&language=ko&page=${page}`;
        return lastValueFrom(this.http.get<SearchMovieDTO>(url));
    }

    public getGenres(genreID: Array<number>) {
        const arr: Array<string> = [];
        genreID.forEach((id) => {
            const genre = genreList.find(list => list.id === id).name;
            arr.push(genre);
        });
        return arr;
    }
}
