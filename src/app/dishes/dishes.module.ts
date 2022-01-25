import {NgModule} from "@angular/core";
import {DishComponent} from "./dish/dish.component";
import {DishesListComponent} from "./dish-list/dishes-list.component";
import {CommonModule} from "@angular/common";
import {MaterialModule} from "../material.module";
import {DishAddComponent} from './dish-add/dish-add.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FlexLayoutModule} from "@angular/flex-layout";
import {DishesComponent} from "./dishes.component";
import {DishRatingComponent} from "./dish-rate/dish-rating.component";
import {DishViewComponent} from './dish-view/dish-view.component';
import {RouterModule} from "@angular/router";
import {MatCarouselModule} from "@ngbmodule/material-carousel";
import { ManageDishesComponent } from './manage-dishes/manage-dishes.component';
import { DishManageViewComponent } from './manage-dishes/dish-manage-view/dish-manage-view.component';
import { DishEditComponent } from './dish-edit/dish-edit.component';


@NgModule({
    declarations: [DishesComponent, DishComponent, DishesListComponent, DishAddComponent, DishRatingComponent, DishViewComponent, ManageDishesComponent, DishManageViewComponent, DishEditComponent],
    imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule, FlexLayoutModule, RouterModule, MatCarouselModule]
})

export class DishesModule {
}
