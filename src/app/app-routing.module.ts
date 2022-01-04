import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'main',
        loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule)
    },
    {
        path: 'todo',
        loadChildren: () => import('./pages/todo/todo.module').then(m => m.TodoModule)
    },
    {
        path: 'weather',
        loadChildren: () => import('./pages/weather/weather.module').then(m => m.WeatherModule)
    },
    {
        path: 'movie',
        loadChildren: () => import('./pages/movie/movie.module').then(m => m.MovieModule)
    },
    {
        path: '',
        redirectTo: '/main',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
