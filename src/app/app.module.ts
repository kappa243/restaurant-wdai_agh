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
import {HomeComponent} from './core/home/home.component';
import {ExtendedModule, FlexModule} from "@angular/flex-layout";
import {LoginComponent} from './auth/login/login.component';
import {AuthService} from "./auth/auth.service";
import {ReactiveFormsModule} from "@angular/forms";
import {RegisterComponent} from './auth/register/register.component';
import {PersistanceStatusComponent} from './auth/persistance-status/persistance-status.component';
import {Error404Component} from './core/error404/error404.component';
import {UserStatusComponent} from './auth/user-status/user-status.component';
import {UserManagementComponent} from './admin/user-management/user-management.component';
import {UserComponent} from './admin/user-management/user/user.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        PersistanceStatusComponent,
        Error404Component,
        UserStatusComponent,
        UserManagementComponent,
        UserComponent
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
        ExtendedModule,
        ReactiveFormsModule
    ],
    providers: [DishesService, AuthService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
