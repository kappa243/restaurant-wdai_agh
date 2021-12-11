import {Component, OnInit} from '@angular/core';
import {Dish} from "../../shared/models/dish.model";
import {DishesService, DishMap} from "../dishes.service";
import {MatDialog} from "@angular/material/dialog";
import {DishAddComponent} from "../dish-add/dish-add.component";
import {delay, Observable} from "rxjs";

@Component({
    selector: 'app-dishes',
    templateUrl: './dishes-list.component.html',
    styleUrls: ['./dishes-list.component.css']
})
export class DishesListComponent implements OnInit {
    dishMaps!: Observable<DishMap[]>;

    constructor(private dishesService: DishesService, public dialog: MatDialog) {
    }

    ngOnInit(): void {
        this.dishMaps = this.dishesService.getDishes();
        // this.dishesService.getDishes().subscribe(dishMap => {
        //     this.dishMaps = dishMap;
        //     console.log(this.obs$)
        // })
    }

    animal: string ='';
    name: string = "bruh";

    addDish(): void {
        const dialogRef = this.dialog.open(DishAddComponent, {data: this.dishMaps});

        // dialogRef.afterClosed().subscribe(result => {
        //     console.log('The dialog was closed');
        //     this.animal = result;
        // });
    }

}
