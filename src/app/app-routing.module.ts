import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {DishesComponent} from "./dishes/dishes.component";

const routes: Routes = [
    // TODO home page
    // prepared for future routing
    {
        path: '',
        component: DishesComponent
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {
}

