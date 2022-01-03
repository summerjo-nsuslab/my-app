export interface BoxOffice {
    rank: string,
    rankInten: number,
    rankOldAndNew: string,
    movieCd: string,
    movieNm: string
}

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

export interface boxOfficeDetailDTO {
    movieInfoResult:{
        movieInfo: {
            movieCd: string,
            movieNm: string,
            movieNmEn: string,
            movieNmOg: string,
            showTm: string,
            prdtYear: string,
            openDt: string,
            prdtStatNm: string,
            typeNm: string,
            nations: Array<{
                nationNm: string
            }>,
            genres: Array<{
                genreNm: string
            }>,
            directors: Array<{
                peopleNm: string
                peopleNmEn: string
            }>,
            actors: Array<{
                peopleNm: string,
                peopleNmEn: string,
                cast: string,
                castEn: string
            }>,
            showTypes: Array<{
                showTypeGroupNm: string,
                showTypeNm: string
            }>,
            companys: Array<{
                companyCd: string,
                companyNm: string,
                companyNmEn: string,
                companyPartNm: string
            }>,
            audits: Array<{
                auditNo: string,
                watchGradeNm: string
            }>,
            staffs: Array<{
                peopleNm: string,
                peopleNmEn: string,
                staffRoleNm: string
            }>
        },
        source: string
    }
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
    movie: Array<{
        poster: string,
        adult: boolean,
        overview: string,
        release_date: string,
        genre: Array<string>,
        id: number,
        title: string,
        backdrop_path: string,
        vote: number
    }>,
    pages: number
}

export interface Genre {
    id: number,
    name: string
}
