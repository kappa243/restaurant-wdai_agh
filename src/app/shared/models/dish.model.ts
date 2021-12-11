export interface Dish {
    name: string;
    type: string;
    cuisine: string;
    category: DishCategory;
    ingredients: string[];
    inStock: number;
    price: number;
    description: string;
    imgs: string[];
}


export enum DishCategory {
    SideDish = 'Side dish',
    Breakfast = 'Breakfast',
    MainCourse = 'Main course',
    Dessert = 'Dessert',
    Supper = 'Supper'
}

export interface DishImage {
    name: string,
    data: string
}
