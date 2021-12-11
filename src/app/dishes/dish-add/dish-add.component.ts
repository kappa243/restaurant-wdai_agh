import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DishesService, DishMap} from "../dishes.service";
import {map, Observable, startWith} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatChipInputEvent} from "@angular/material/chips";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {Dish, DishCategory, DishImage} from "../../shared/models/dish.model";

@Component({
    selector: 'app-dish-add',
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

    imgs: DishImage[] = [];

    ingredients: Set<string> = new Set();

    readonly separatorKeysCodes = [ENTER, COMMA] as const;

    formDescription = new FormControl();

    formGroup = new FormGroup({
        name: new FormControl('', Validators.required),
        type: new FormControl('', Validators.required),
        cuisine: new FormControl('', Validators.required),
        category: new FormControl('', Validators.required),
        stock: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.min(0)]),
        price: new FormControl('', [Validators.required, Validators.min(0)]),
        image: new FormControl(),
        ingredients: new FormControl(''),
        description: new FormControl('', Validators.required)
    });

    constructor(private dishesService: DishesService,
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

    imageUploadChange(event: any) {
        // TODO image upload using dishes service (firebase)
        // const file = event.dataTransfer ? event.dataTransfer.files[0] : event.target.files[0];
        // const reader = new FileReader();
        //
        // let ffdf: Partial<IFileSaveDto>
        // reader.readAsDataURL(file);
        // reader.onload = () => {
        //     this.formGroup.get('img')
        // }
        //
        //
        // console.log(fileInputEvent.target.files[0]);
    }

    // async onImageChange(event: any) {
    //     let files = [].slice.call(event.target.files);
    //
    //     let stored: Promise<DishImage>[] = [];
    //
    //     if (files && files[0]) {
    //         for (let file of files) {
    //             const data: Promise<DishImage> = await this.readFileAsync(file);
    //             stored.push(await data);
    //         }
    //     }
    //     return this.imgs;
    // }
    //
    //
    // private async readFileAsync(file: any) {
    //     return new Promise((resolve, reject) => {
    //         let reader = new FileReader();
    //
    //         reader.onload = () => {
    //             const base64: string = <string>reader.result;
    //             let dishImage: DishImage = {
    //                 name: file.name,
    //                 data: base64
    //             }
    //             resolve(dishImage);
    //         };
    //
    //         reader.onerror = reject;
    //         reader.readAsDataURL(file);
    //     })
    // }

    test(e: any) {

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
                imgs: []
            }

            this.dishesService.addDish(dish)
            // console.log(this.dishesService.getDishes())
        }
        console.log(this.formGroup.value);  // { first: '', last: '' }
        console.log(this.formGroup.valid);  // false
    }

    close() {
        this.dialogRef.close();
    }

    private filterString(text: string, list: string[]) {
        const value = text.trim().toLowerCase();
        return list.filter(option => option.toLowerCase().includes(value));
    }


}
