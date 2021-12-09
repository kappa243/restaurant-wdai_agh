import {NgModule} from '@angular/core';
import {BrowserModule, DomSanitizer} from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MaterialModule} from "./material.module";

import {AppComponent} from './app.component';
import {MatIconModule, MatIconRegistry} from "@angular/material/icon";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        HttpClientModule,
        BrowserModule,
        BrowserAnimationsModule,
        MaterialModule,
        MatIconModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
        matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('./assets/mdi.svg'));
    }
}
