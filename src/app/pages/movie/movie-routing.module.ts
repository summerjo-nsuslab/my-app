import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RankComponent } from './rank/rank.component';
import { MovieComponent } from './movie.component';
import { SearchResultComponent } from './search-result/search-result.component';

const routes: Routes = [
    {
        path: '',
        component: MovieComponent,
        children: [
            {
                path: '',
                component: RankComponent
            },
            {
                path: 'search/:query/page/:page',
                component: SearchResultComponent
            }
        ]
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MovieRoutingModule { }
