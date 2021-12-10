import {Component, OnInit} from '@angular/core';
import {Dish} from "../../shared/models/dish.model";
import {DishesService} from "../dishes.service";
import {MatDialog} from "@angular/material/dialog";
import {DishAddComponent} from "../dish-add/dish-add.component";

@Component({
    selector: 'app-dishes',
    templateUrl: './dishes-list.component.html',
    styleUrls: ['./dishes-list.component.css']
})
export class DishesListComponent implements OnInit {
    dishes: Dish[] = [];

    constructor(private dishesService: DishesService, public dialog: MatDialog) {
    }

    ngOnInit(): void {
        this.dishes = this.dishesService.getDishes();

        // if dish will be added refresh automatically
        this.dishesService.dishesChanged.subscribe(
            (dishes: Dish[]) => {
                this.dishes = dishes;
            }
        )
    }

    animal: string ='';
    name: string = "bruh";

    addDish(): void {
        const dialogRef = this.dialog.open(DishAddComponent, {
            data: {name: this.name, animal: this.animal},
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.animal = result;
        });
    }

}
