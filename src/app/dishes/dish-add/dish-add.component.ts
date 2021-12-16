import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DishesService, DishMap} from "../dishes.service";
import {map, Observable, startWith} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatChipInputEvent} from "@angular/material/chips";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {Dish, DishCategory} from "../../shared/models/dish.model";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
    selector: 'dishes-add',
    templateUrl: './dish-add.component.html',
    styleUrls: ['./dish-add.component.css']
})
export class DishAddComponent implements OnInit {
    dishMap!: Observable<DishMap[]>;
    dishes: Dish[] = [];

    types: string[] = [];
    filteredTypes?: Observable<string[]>;

    cuisines: string[] = [];
    filteredCuisines?: Observable<string[]>;

    categories: string[] = [];

    ingredients: Set<string> = new Set();
    images: Set<string> = new Set();

    readonly separatorKeysCodes = [ENTER, COMMA] as const;

    formDescription = new FormControl();

    formGroup = new FormGroup({
        name: new FormControl('', Validators.required),
        type: new FormControl('', Validators.required),
        cuisine: new FormControl('', Validators.required),
        category: new FormControl('', Validators.required),
        stock: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.min(0)]),
        price: new FormControl('', [Validators.required, Validators.min(0)]),
        images: new FormControl('', Validators.required),
        ingredients: new FormControl(''),
        description: new FormControl('', Validators.required)
    });

    constructor(private dishesService: DishesService,
                private snackBar: MatSnackBar,
                public dialogRef: MatDialogRef<DishAddComponent>,
                @Inject(MAT_DIALOG_DATA) public data: Observable<DishMap[]>) {
        this.dishMap = data;
    }

    ngOnInit(): void {
        // this.dialogRef.updateSize('auto')
        this.dishMap.subscribe(dishMap => {
            this.dishes = dishMap.map(dishMap => dishMap.dish)


            let types = new Set<string>();
            this.dishes.forEach(dish => {
                types.add(dish.type)
            })
            this.types = Array.from(types);
            this.filteredTypes = this.formGroup.controls['type'].valueChanges.pipe(
                startWith(''),
                map(type => (type ? this.filterString(type, this.types) : this.types))
            )

            let cuisines = new Set<string>();
            this.dishes.forEach(dish => {
                cuisines.add(dish.cuisine)
            })
            this.cuisines = Array.from(cuisines);
            this.filteredCuisines = this.formGroup.controls['cuisine'].valueChanges.pipe(
                startWith(''),
                map(cuisine => (cuisine ? this.filterString(cuisine, this.cuisines) : this.cuisines))
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

            this.dishesService.addDish(dish).then(() => {
                this.snackBar.open("Dish successfully created", undefined, {
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
