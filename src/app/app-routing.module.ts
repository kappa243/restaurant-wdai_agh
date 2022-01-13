import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {DishesComponent} from "./dishes/dishes.component";
import {CartViewComponent} from "./cart/cart-view/cart-view.component";
import {HomeComponent} from "./core/home/home.component";

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'dishes',
        component: DishesComponent
    },
    {
        path: 'cart',
        component: CartViewComponent
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {
}

