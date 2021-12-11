import {NgModule} from "@angular/core";
import {DishComponent} from "./dish/dish.component";
import {DishesListComponent} from "./dish-list/dishes-list.component";
import {DishCurrencyPipe} from "../shared/pipes/dishCurrency.pipe";
import {CommonModule} from "@angular/common";
import {MaterialModule} from "../material.module";
import {DishAddComponent} from './dish-add/dish-add.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FlexLayoutModule} from "@angular/flex-layout";


@NgModule({
    declarations: [DishComponent, DishesListComponent, DishCurrencyPipe, DishAddComponent],
    imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule, FlexLayoutModule]
})

export class DishesModule {
}