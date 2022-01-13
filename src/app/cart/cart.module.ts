import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MaterialModule} from "../material.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {CartButtonComponent} from './cart-button/cart-button.component';
import {CartStatusComponent} from './cart-status/cart-status.component';
import { CartViewComponent } from './cart-view/cart-view.component';
import {AppRoutingModule} from "../app-routing.module";

@NgModule({
    declarations: [
        CartButtonComponent,
        CartStatusComponent,
        CartViewComponent
    ],
    exports: [
        CartButtonComponent,
        CartStatusComponent
    ],
    imports: [CommonModule, MaterialModule, FlexLayoutModule, AppRoutingModule]
})

export class CartModule {
}
