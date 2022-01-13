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
import {DishViewComponent} from './dish-view/dish-view.component';
import {RouterModule} from "@angular/router";
import {MatCarouselModule} from "@ngbmodule/material-carousel";


@NgModule({
    declarations: [DishesComponent, DishComponent, DishesListComponent, DishAddComponent, DishRatingComponent, DishViewComponent],
    imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule, FlexLayoutModule, RouterModule, MatCarouselModule]
})

export class DishesModule {
}
