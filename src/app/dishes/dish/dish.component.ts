import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Dish} from "../../shared/models/dish.model";
import {DishesService, DishMap} from "../dishes.service";

@Component({
    selector: 'app-dish',
    templateUrl: './dish.component.html',
    styleUrls: ['./dish.component.css']
})
export class DishComponent implements OnInit {
    @Input() dishMap!: DishMap;
    dish!: Dish;

    @Output() orderEvent = new EventEmitter<boolean>();

    count: number = 0;

    constructor(private dishesService: DishesService) {
    }

    ngOnInit(): void {
        this.dish = this.dishMap.dish;
    }


    addOrder() {
        if (this.count < this.dish.inStock) {
            this.count++;
            this.orderEvent.emit(true);
        }
    }


    removeOrder() {
        if (this.count > 0) {
            this.count--;
            this.orderEvent.emit(false);
        }
    }

    editDish() {

    }

    deleteDish() {
        this.dishesService.removeDish(this.dishMap.key);
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
