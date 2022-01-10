import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { MovieRoutingModule } from './movie-routing.module';
import { RankComponent } from './rank/rank.component';
import { SearchComponent } from './search/search.component';
import { MovieComponent } from './movie.component';
import { SearchResultComponent } from './search-result/search-result.component';

@NgModule({
    declarations: [
        RankComponent,
        SearchComponent,
        MovieComponent,
        SearchResultComponent
    ],
    imports: [
        SharedModule,
        MovieRoutingModule
    ]
})
export class MovieModule { }
