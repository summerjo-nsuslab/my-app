import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

const COMMON_MODULES = [
    BrowserModule
];

@NgModule({
    declarations: [],
    imports: [
        ...COMMON_MODULES
    ],
    exports: [
        ...COMMON_MODULES
    ]
})
export class CoreModule { }
