import {Dish, DishCategory} from "./shared/models/dish.model";

export const DishesData: Dish[] = [
    {
        name: 'name',
        type: 'type',
        cuisine: 'cuisine',
        category: DishCategory.Breakfast,
        ingredients: ["apple", "banana"],
        inStock: 5,
        price: 25,
        description: 'description descript ... lorem',
        imgs: []
    },
    {
        name: 'name2',
        type: 'type222',
        cuisine: 'cuisine2',
        category: DishCategory.MainCourse,
        ingredients: ["apple", "banana"],
        inStock: 0,
        price: 60,
        description: 'description descript ... lorem222',
        imgs: []
    },
    {
        name: 'name3',
        type: 'type223',
        cuisine: 'cuisine4',
        category: DishCategory.Supper,
        ingredients: ["apple", "banana"],
        inStock: 7,
        price: 12,
        description: 'description descript53 ... lorem222',
        imgs: []
    }

]
