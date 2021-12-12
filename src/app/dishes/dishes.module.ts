import {NgModule} from "@angular/core";
import {DishComponent} from "./dish/dish.component";
import {DishesListComponent} from "./dish-list/dishes-list.component";
import {CommonModule} from "@angular/common";
import {MaterialModule} from "../material.module";
import {DishAddComponent} from './dish-add/dish-add.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FlexLayoutModule} from "@angular/flex-layout";
import {DishesComponent} from "./dishes.component";
import {DishRatingComponent} from "./dish/dish-rate/dish-rating.component";


@NgModule({
    declarations: [DishesComponent, DishComponent, DishesListComponent, DishAddComponent, DishRatingComponent],
    imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule, FlexLayoutModule]
})

export class DishesModule {
}
