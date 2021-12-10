import {DishesData} from "../dummyData";
import {Dish, DishCategory} from "../shared/models/dish.model";
import {EventEmitter} from "@angular/core";

export class DishesService {
    dishesChanged = new EventEmitter<Dish[]>();

    private dishes = DishesData;

    getDishes() {
        return this.dishes;
    }

    getTypes(): string[] {
        let types = new Set<string>();
        this.dishes.forEach(dish => types.add(dish.type));
        return Array.from(types);
    }

    getCuisines(): string[] {
        let cuisines = new Set<string>();
        this.dishes.forEach(dish => cuisines.add(dish.cuisine));
        return Array.from(cuisines);
    }

    getCategories(): string[] {
        return Object.values(DishCategory);
    }

    addDish(dish: Dish) {
        this.dishes.push(dish);
        this.dishesChanged.emit(this.dishes);
    }

    removeDish(dish: Dish) {
        console.log(Object.values(DishCategory));
        console.log(this.getCategories());
        console.log(this.dishes.filter(el => el !== dish));
        this.dishes = this.dishes.filter(el => el !== dish);
        this.dishesChanged.emit(this.dishes);
    }
}
