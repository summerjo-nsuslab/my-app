import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { InMemoryDataService } from './services/in-memory-data.service';

const COMMON_MODULES = [
    BrowserModule,
    HttpClientModule
];

@NgModule({
    declarations: [],
    imports: [
        ...COMMON_MODULES,
        HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
            dataEncapsulation: false, passThruUnknownUrl: true
        })
    ],
    exports: [
        ...COMMON_MODULES
    ]
})
export class CoreModule {
}
