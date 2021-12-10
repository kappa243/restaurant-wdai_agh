import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DishesService} from "../dishes.service";
import {map, Observable, startWith} from "rxjs";
import {FormControl} from "@angular/forms";
import {MatChipInputEvent} from "@angular/material/chips";
import {COMMA, ENTER} from "@angular/cdk/keycodes";

@Component({
    selector: 'app-dish-add',
    templateUrl: './dish-add.component.html',
    styleUrls: ['./dish-add.component.css']
})
export class DishAddComponent implements OnInit {
    formName = new FormControl();

    types: string[] = [];
    formType = new FormControl();
    filteredTypes?: Observable<string[]>;

    cuisines: string[] = [];
    formCuisine = new FormControl();
    filteredCuisines?: Observable<string[]>;

    categories: any;
    formCategory = new FormControl();

    formStock = new FormControl();

    formPrice = new FormControl();

    ingredients: Set<string> = new Set();
    formIngredients = new FormControl();
    readonly separatorKeysCodes = [ENTER, COMMA] as const;

    formDescription = new FormControl();

    constructor(private dishesService: DishesService,
                public dialogRef: MatDialogRef<DishAddComponent>,
                @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {
    }

    ngOnInit(): void {
        // this.dialogRef.updateSize('auto')

        this.types = this.dishesService.getTypes();
        this.filteredTypes = this.formType.valueChanges.pipe(
            startWith(''),
            map(type => (type ? this.filterString(type, this.types) : this.types))
        )

        this.cuisines = this.dishesService.getCuisines();
        this.filteredCuisines = this.formCuisine.valueChanges.pipe(
            startWith(''),
            map(cuisine => (cuisine ? this.filterString(cuisine, this.cuisines) : this.cuisines))
        )

        this.categories = this.dishesService.getCategories();
    }

    private filterString(text: string, list: string[]){
        const value = text.trim().toLowerCase();
        return list.filter(option => option.toLowerCase().includes(value));
    }

    addIngredient(event: MatChipInputEvent){
        const ingredient = (event.value || '').trim();

        if(ingredient){
            this.ingredients.add(ingredient);
        }

        event.chipInput!.clear();
    }

    removeIngredient(ingredient: string){
        this.ingredients.delete(ingredient);
    }

    imageUploadChange(fileInputEvent: any) {
        console.log(fileInputEvent.target.files[0]);
    }


    close() {
        this.dialogRef.close();
    }


}

export interface DialogData {
    animal: string;
    name: string;
}

