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
        path: '**',
        redirectTo: 'main'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
