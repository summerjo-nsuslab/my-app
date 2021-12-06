import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

const ANGULAR_MODULE = [
    CommonModule,
    ReactiveFormsModule
];

@NgModule({
    declarations: [],
    imports: [
        ...ANGULAR_MODULE
    ],
    exports: [
        ...ANGULAR_MODULE
    ]
})
export class SharedModule { }
