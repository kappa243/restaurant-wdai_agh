import {Injectable} from "@angular/core";
import {Dish} from "../shared/models/dish.model";

@Injectable({
    providedIn: 'root'
})
export class CartService {

    private basketItems: Array<{ dish: Dish, count: number }> = new Array<{dish: Dish; count: number}>();

    itemsInBasket() {
        let sum = 0;
        this.basketItems.forEach(dish => {
            sum += dish.count;
        })
        return sum;
    }

    getCost(){
        let sum = 0;
        this.basketItems.forEach(dish => {
            sum += dish.count * dish.dish.price;
        })
        return sum;
    }

    addToBasket(dish: Dish) {
        let index = this.basketItems.findIndex(o => o.dish == dish);
        if(index != -1){
            this.basketItems[index].count++;
        }else{
            this.basketItems.push({dish: dish, count: 1});
        }
    }

    removeFromBasket(dish: Dish) {
        let index = this.basketItems.findIndex(o => o.dish == dish);
        if(index != -1){
            this.basketItems[index].count--;
            if(this.basketItems[index].count == 0){
                this.basketItems.splice(index, 1);
            }
        }
    }

}
