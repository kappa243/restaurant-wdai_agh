import {Component, OnInit} from '@angular/core';
import {CartService} from "../cart.service";
import {DishesService, DishMap} from "../../dishes/dishes.service";
import {Observable} from "rxjs";

@Component({
    selector: 'app-cart-view',
    templateUrl: './cart-view.component.html',
    styleUrls: ['./cart-view.component.css']
})
export class CartViewComponent implements OnInit {

    basketItems!: Array<{ key: String; count: number }>;
    dishMaps!: Observable<DishMap[]>;
    dishes!: DishMap[];

    constructor(private cartService: CartService, private dishesService: DishesService) {
        this.basketItems = this.cartService.getBasketItems();
        this.dishMaps = this.dishesService.getDishes();
        this.dishMaps.subscribe(w => {
            this.dishes = w;
        });

    }

    ngOnInit(): void {
    }

    getDish(key: String) {
        return this.dishes.find(dishMap => dishMap.key == key)!
    }

    removeFromBasket(dishMap: DishMap) {
        this.cartService.removeFromBasket(dishMap);
    }

    buyProducts() {
        this.cartService.buyProducts();
    }
}
