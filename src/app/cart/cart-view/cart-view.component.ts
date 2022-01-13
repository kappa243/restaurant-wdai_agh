import {Component, OnInit} from '@angular/core';
import {CartService} from "../cart.service";
import {Dish} from "../../shared/models/dish.model";

@Component({
    selector: 'app-cart-view',
    templateUrl: './cart-view.component.html',
    styleUrls: ['./cart-view.component.css']
})
export class CartViewComponent implements OnInit {

    basketItems: Array<{ dish: Dish; count: number }>;

    constructor(private cartService: CartService) {
        this.basketItems = this.cartService.getBasketItems();
    }

    ngOnInit(): void {
    }


    removeFromBasket(dish: Dish){
        this.cartService.removeFromBasket(dish);
    }
}
