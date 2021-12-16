import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MaterialModule} from "../material.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {CartButtonComponent} from './cart-button/cart-button.component';
import {CartStatusComponent} from './cart-status/cart-status.component';

@NgModule({
    declarations: [
        CartButtonComponent,
        CartStatusComponent
    ],
    exports: [
        CartButtonComponent,
        CartStatusComponent
    ],
    imports: [CommonModule, MaterialModule, FlexLayoutModule]
})

export class CartModule {
}
