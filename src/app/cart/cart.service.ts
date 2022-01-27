import {Injectable} from "@angular/core";
import {DishesService, DishMap} from "../dishes/dishes.service";
import {AuthService} from "../auth/auth.service";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {Router} from "@angular/router";
import {map} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CartService {

    dishes!: DishMap[];

    private basketItems: Array<{ key: String, count: number }> = new Array<{ key: String; count: number }>();

    constructor(private router: Router, private dishesService: DishesService, private authService: AuthService, private db: AngularFireDatabase) {
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

    buyProducts() {
        if (this.basketItems.length > 0 && this.authService.isLoggedIn()) {
            this.db.list('/transactions/' + this.authService.getUID()).push(this.basketItems);

            for (let item of this.basketItems) {
                let dishMap = this.dishes.find(dishMap => dishMap.key == item.key)!;
                dishMap.dish.inStock -= item.count;
                this.dishesService.updateDish(dishMap.key, dishMap.dish);
            }

            this.basketItems = new Array<{ key: String; count: number }>();
            this.router.navigate(['/dishes'])
        }
    }

    isBought(key: string) {
        return this.db.list<Array<{ key: String, count: number }>>('/transactions/' + this.authService.getUID()).valueChanges().pipe(map(transactions => {
            for (let transac of transactions) {
                let detected = transac.find(item => item.key == key)
                if (detected != undefined) {
                    return true
                }
            }
            return false;
        }))
    }

}
