import {Injectable} from "@angular/core";
import {DishesService, DishMap} from "../dishes/dishes.service";

@Injectable({
    providedIn: 'root'
})
export class CartService {

    dishes!: DishMap[];

    private basketItems: Array<{ key: String, count: number }> = new Array<{ key: String; count: number }>();

    constructor(private dishesService: DishesService) {
        dishesService.getDishes().subscribe(value => {
            this.dishes = value;
        })
    }

    itemsInBasket() {
        let sum = 0;
        this.basketItems.forEach(item => {
            sum += item.count;
        })
        return sum;
    }

    getCost() {
        let sum = 0;
        this.basketItems.forEach(dish => {
            sum += dish.count * this.dishes.find(dishMap => dishMap.key == dish.key)!.dish.price
        })
        return sum;
    }

    addToBasket(dishMap: DishMap) {

        let index = this.basketItems.findIndex(o => o.key == dishMap.key);
        if (index != -1) {
            this.basketItems[index].count++;
        } else {
            this.basketItems.push({key: dishMap.key, count: 1});
        }
    }

    removeFromBasket(dishMap: DishMap) {
        let index = this.basketItems.findIndex(o => o.key == dishMap.key);
        if (index != -1) {
            this.basketItems[index].count--;
            if (this.basketItems[index].count == 0) {
                this.basketItems.splice(index, 1);
            }
        }
    }

    getBasketItems() {
        return this.basketItems;
    }

}
