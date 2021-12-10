import {RouterModule, Routes} from "@angular/router";
import {DishesListComponent} from "./dishes/dish-list/dishes-list.component";
import {NgModule} from "@angular/core";

const routes: Routes = [
    // TODO home page
    // prepared for future routing
    {
        path: '',
        component: DishesListComponent
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}

