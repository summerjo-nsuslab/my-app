export interface BoxOfficeDTO {
    boxOfficeResult: {
        boxofficeType: string,
        showRange: string,
        dailyBoxOfficeList: Array<{
            rnum: string,
            rank: string,
            rankInten: string,
            rankOldAndNew: string,
            movieCd: string,
            movieNm: string,
            openDt: string,
            salesAmt: string,
            salesShare: string,
            salesInten: string,
            salesChange: string,
            salesAcc: string,
            audiCnt: string,
            audiInten: string,
            audiChange: string,
            audiAcc: string,
            scrnCnt: string,
            showCnt: string
        }>
    }
}

export interface BoxOffice {
    rank: string,
    rankInten: number,
    movieNm: string,
    movieStatusType: string,
    poster?: string,
    overview?: string,
    release_date?: string,
    genre?: Array<string>,
    vote?: number,
    active: boolean
}

export interface SearchMovieDTO {
    page: number,
    results: Array<{
        poster_path: string,
        adult: boolean,
        overview: string,
        release_date: string,
        genre_ids: Array<number>,
        id: number,
        original_title: string,
        original_language: string,
        title: string,
        backdrop_path: string,
        popularity: number,
        vote_count: number
        video: boolean,
        vote_average: number
    }>,
    total_results: number,
    total_pages: number
}

export interface MovieInfo {
    poster: string,
    overview: string,
    release_date: string,
    genre: Array<string>,
    title?: string,
    vote: number
}

export interface Genre {
    id: number,
    name: string
}
