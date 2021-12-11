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
    rates: DishRate[] | undefined
}


export enum DishCategory {
    Breakfast = 'Breakfast',
    SideDish = 'Side dish',
    MainCourse = 'Main course',
    Dessert = 'Dessert',
    Supper = 'Supper'
}

export interface DishImage {
    name: string,
    data: string
}

export interface DishRate {
    user: string,
    rate: number
}
