import {Component, Input, OnInit} from '@angular/core';
import {Dish} from "../../shared/models/dish.model";
import {DishesService, DishMap} from "../dishes.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CartService} from "../../cart/cart.service";

@Component({
    selector: 'dishes-dish',
    templateUrl: './dish.component.html',
    styleUrls: ['./dish.component.css']
})
export class DishComponent implements OnInit {
    @Input() dishMap!: DishMap;
    dish!: Dish;


    count: number = 0;

    constructor(private dishesService: DishesService, private cartService: CartService, private snackBar: MatSnackBar) {
    }

    ngOnInit(): void {
        this.dish = this.dishMap.dish;
        let basketItem = this.cartService.getBasketItems().find(dish => dish.key == this.dishMap.key);

        if (basketItem != undefined) {
            this.count = basketItem.count;
        }
    }


    addOrder() {
        if (this.count < this.dish.inStock) {
            this.count++;
        }

        this.cartService.addToBasket(this.dishMap);
    }


    removeOrder() {
        if (this.count > 0) {
            this.count--;
        }
        this.cartService.removeFromBasket(this.dishMap);
    }

    editDish() {

    }

    deleteDish() {
        this.dishesService.removeDish(this.dishMap.key).then(() => {
            this.snackBar.open("Dish successfully delete", undefined, {
                duration: 3000
            })
        })

    }

    getCountColor(): string {
        let perc = 100 * this.count / this.dish.inStock;

        if (perc >= 70) {
            return '#eb5050';
        } else if (perc >= 50) {
            return '#ebac4d';
        } else {
            return '#000000';
        }
    }

    getPriceColor(): string {
        if (this.dish.price >= 50) {
            return '#f84c4c';
        } else if (this.dish.price >= 25) {
            return '#f8994c'
        } else {
            return '#9ff84c'
        }
    }
}
