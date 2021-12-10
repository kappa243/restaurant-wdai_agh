import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from "./app-routing.module";

//components
import {AppComponent} from './app.component';
import {AlertComponent} from "./shared/dialog/alert/alert.component";
import {DishesModule} from "./dishes/dishes.module";
import {DishesService} from "./dishes/dishes.service";

@NgModule({
    declarations: [
        AppComponent,
        AlertComponent
    ],
    imports: [
        HttpClientModule,
        BrowserModule,
        BrowserAnimationsModule,
        DishesModule,
        AppRoutingModule
    ],
    providers: [DishesService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
