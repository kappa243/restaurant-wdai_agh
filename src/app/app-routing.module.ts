import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {DishesComponent} from "./dishes/dishes.component";
import {CartViewComponent} from "./cart/cart-view/cart-view.component";
import {HomeComponent} from "./core/home/home.component";
import {DishViewComponent} from "./dishes/dish-view/dish-view.component";
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {AuthGuard} from "./auth/auth.guard";
import {Error404Component} from "./core/error404/error404.component";
import {UserManagementComponent} from "./admin/user-management/user-management.component";
import {Roles} from "./auth/user";
import {ManageDishesComponent} from "./dishes/manage-dishes/manage-dishes.component";


const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'dishes',
        component: DishesComponent,
        canActivate: [AuthGuard]
    },

    {
        path: 'dishes/:id',
        component: DishViewComponent,
        canActivate: [AuthGuard],
        data: {
            userRoles: []
        }
    },
    {
        path: 'cart',
        component: CartViewComponent,
        canActivate: [AuthGuard],
        data: {
            userRoles: []
        }

    },
    {
        path: 'dishes-management',
        component: ManageDishesComponent
    },
    {
        path: 'users-management',
        component: UserManagementComponent,
        canActivate: [AuthGuard],
        data: {
            userRoles: [Roles.ADMIN]
        }
    },
    {
        path: '404',
        component: Error404Component
    },
    {
        path: '**',
        redirectTo: '404',
        pathMatch: 'full'
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {
}

