import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from "./app-routing.module";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from '../environments/environment';
import {DishesService} from "./dishes/dishes.service";
import {AppComponent} from './app.component';
import {DishesModule} from "./dishes/dishes.module";
import {HeaderComponent} from './core/header/header.component';
import {MaterialModule} from "./material.module";
import {CartModule} from "./cart/cart.module";
import { HomeComponent } from './core/home/home.component';
import {ExtendedModule, FlexModule} from "@angular/flex-layout";

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        HomeComponent
    ],
    imports: [
        HttpClientModule,
        BrowserModule,
        BrowserAnimationsModule,
        DishesModule,
        MaterialModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        CartModule,
        FlexModule,
        ExtendedModule
    ],
    providers: [DishesService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
