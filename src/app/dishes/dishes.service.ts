import {Dish, DishCategory} from "../shared/models/dish.model";
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
        this.dataRef.push(dish);
    }

    getDishes() {
        return this.dishes;
    }

    // getTypes() {
    //     let types = new Set<string>();
    //     return this.dishes.forEach(dishMap => {
    //         dishMap.filter(dish => {
    //             types.add(dish.dish.type)
    //         })
    //     }).then(r => types);
    //     // return Array.from(types);
    // }
    //
    // getCuisines(): string[] {
    //     let cuisines = new Set<string>();
    //     this.dishes.forEach(dishMap => {
    //         dishMap.filter(dish => {
    //             cuisines.add(dish.dish.cuisine)
    //         })
    //     });
    //     return Array.from(cuisines);
    // }
    //
    // getCategories(): string[] {
    //     return Object.values(DishCategory);
    // }

    removeDish(key: string) {
        this.dataRef.remove(key);

        // console.log(Object.values(DishCategory));
        // console.log(this.getCategories());
        // console.log(this.dishes.filter(el => el !== dish));
        // this.dishes = this.dishes.filter(el => el !== dish);
        // this.dishesChanged.emit(this.dishes);
    }
}

export interface DishMap {
    key: string;
    dish: Dish;
}
