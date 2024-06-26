export interface Dish {
    name: string,
    type: string,
    cuisine: string,
    category: DishCategory,
    ingredients: string[],
    inStock: number,
    price: number,
    description: string,
    imgs: string[],
    ratings: DishRating[] | undefined
}


export enum DishCategory {
    Breakfast = 'Breakfast',
    SideDish = 'Side dish',
    MainCourse = 'Main course',
    Dessert = 'Dessert',
    Supper = 'Supper'
}


export interface DishRating {
    user: string,
    rating: number
}
