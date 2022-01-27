import {Component, Inject, OnInit} from '@angular/core';
import {map, Observable, startWith} from "rxjs";
import {DishesService, DishMap} from "../dishes.service";
import {Dish, DishCategory} from "../../shared/models/dish.model";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatChipInputEvent} from "@angular/material/chips";

@Component({
    selector: 'app-dish-edit',
    templateUrl: './dish-edit.component.html',
    styleUrls: ['./dish-edit.component.css']
})
export class DishEditComponent implements OnInit {
    dishes: Dish[] = [];

    dishMap!: DishMap;
    dish!: Dish;

    types: string[] = [];
    filteredTypes?: Observable<string[]>;

    cuisines: string[] = [];
    filteredCuisines?: Observable<string[]>;

    categories: string[] = [];

    ingredients: Set<string> = new Set();
    images: Set<string> = new Set();

    readonly separatorKeysCodes = [ENTER, COMMA] as const;

    formGroup: FormGroup;

    constructor(private dishesService: DishesService,
                private snackBar: MatSnackBar,
                public dialogRef: MatDialogRef<DishEditComponent>,
                @Inject(MAT_DIALOG_DATA) public data: DishMap) {
        this.dishMap = data;
        this.dish = this.dishMap.dish

        this.formGroup = new FormGroup({
            name: new FormControl(this.dish.name, Validators.required),
            type: new FormControl(this.dish.type, Validators.required),
            cuisine: new FormControl(this.dish.cuisine, Validators.required),
            category: new FormControl(this.dish.category, Validators.required),
            stock: new FormControl(this.dish.inStock, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.min(0)]),
            price: new FormControl(this.dish.price, [Validators.required, Validators.min(0)]),
            images: new FormControl(''),
            ingredients: new FormControl(''),
            description: new FormControl(this.dish.description, Validators.required)
        });
    }

    ngOnInit(): void {

        for (let img of this.dish.imgs) {
            this.images.add(img);
        }
        for (let ing of this.dish.ingredients) {
            this.ingredients.add(ing);
        }

        this.dishesService.getDishes().subscribe(dishMapIt => {
            this.dishes = dishMapIt.map(dishMap => dishMap.dish)


            let types = new Set<string>();
            this.dishes.forEach(dish => {
                types.add(dish.type)
            })
            this.types = Array.from(types);
            this.filteredTypes = this.formGroup.controls['type'].valueChanges.pipe(
                startWith(''),
                map(type => (type ? this.filterString(<string>type, this.types) : this.types))
            )

            let cuisines = new Set<string>();
            this.dishes.forEach(dish => {
                cuisines.add(dish.cuisine)
            })
            this.cuisines = Array.from(cuisines);
            this.filteredCuisines = this.formGroup.controls['cuisine'].valueChanges.pipe(
                startWith(''),
                map(cuisine => (cuisine ? this.filterString(<string>cuisine, this.cuisines) : this.cuisines))
            )

            this.categories = Object.values(DishCategory);
        })
    }

    addIngredient(event: MatChipInputEvent) {
        const ingredient = (event.value || '').trim();

        if (ingredient) {
            this.ingredients.add(ingredient);
        }

        event.chipInput!.clear();
    }

    removeIngredient(ingredient: string) {
        this.ingredients.delete(ingredient);
    }

    addImage(event: MatChipInputEvent) {
        const image = (event.value || '').trim();

        if (image) {
            this.images.add(image);
        }

        event.chipInput!.clear();
    }

    removeImage(image: string) {
        this.images.delete(image);
    }


    public hasError = (controlName: string, errorName: string) => {
        return this.formGroup.controls[controlName].hasError(errorName);
    }

    onSubmit() {
        if (this.formGroup.valid) {
            this.dialogRef.close();
            let values = this.formGroup.value;

            let dish: Dish = {
                name: values.name,
                type: values.type,
                cuisine: values.cuisine,
                category: values.category,
                ingredients: Array.from(this.ingredients),
                inStock: values.stock,
                price: values.price,
                description: values.description,
                imgs: Array.from(this.images),
                ratings: []
            }

            console.log(dish)

            this.dishesService.updateDish(this.dishMap.key, dish).then(() => {
                this.snackBar.open("Dish successfully updated", undefined, {
                    duration: 3000
                })
            })
        }
    }

    close() {
        this.dialogRef.close();
    }

    private filterString(text: string, list: string[]) {
        const value = text.trim().toLowerCase();
        return list.filter(option => option.toLowerCase().includes(value));
    }


}
