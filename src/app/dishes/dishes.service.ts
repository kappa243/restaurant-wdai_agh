import {Dish} from "../shared/models/dish.model";
import {Injectable} from "@angular/core";
import {AngularFireDatabase, AngularFireList} from "@angular/fire/compat/database";
import {map, Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class DishesService {
    private dishes: Observable<DishMap[]>;
    dataRef!: AngularFireList<Dish>;

    constructor(private db: AngularFireDatabase) {
        this.dataRef = db.list('/products');

        this.dishes = this.dataRef.snapshotChanges().pipe(
            map(res => res.map(c =>
                (<DishMap>{key: c.key, dish: c.payload.val()}))
            ))
    }

    addDish(dish: Dish) {
        return this.dataRef.push(dish);
    }

    getDishes() {
        return this.dishes;
    }

    updateDish(key: string, dish: Dish) {
        return this.dataRef.set(key, dish);
    }

    removeDish(key: string) {
        return this.dataRef.remove(key);
    }
}

export interface DishMap {
    key: string;
    dish: Dish;
}
