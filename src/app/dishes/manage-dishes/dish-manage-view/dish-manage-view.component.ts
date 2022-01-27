import {Component, Input, OnInit} from '@angular/core';
import {DishesService, DishMap} from "../../dishes.service";
import {Dish} from "../../../shared/models/dish.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {DishEditComponent} from "../../dish-edit/dish-edit.component";

@Component({
    selector: 'app-dish-manage-view',
    templateUrl: './dish-manage-view.component.html',
    styleUrls: ['./dish-manage-view.component.css']
})
export class DishManageViewComponent implements OnInit {
    @Input() dishMap!: DishMap;
    dish!: Dish;

    constructor(private dishesService: DishesService, private snackBar: MatSnackBar, public dialog: MatDialog) {
    }

    ngOnInit(): void {
        this.dish = this.dishMap.dish;
    }

    deleteDish() {
        this.dishesService.removeDish(this.dishMap.key).then(() => {
            this.snackBar.open("Dish successfully delete", undefined, {
                duration: 3000
            })
        })

    }

    editDish(dishMap: DishMap){
        this.dialog.open(DishEditComponent, {data: dishMap})
    }
}

