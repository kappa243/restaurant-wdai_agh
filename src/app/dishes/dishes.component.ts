import {Component, OnInit} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {DishAddComponent} from "./dish-add/dish-add.component";
import {Observable} from "rxjs";
import {DishesService, DishMap} from "./dishes.service";

@Component({
    selector: 'dishes',
    templateUrl: './dishes.component.html',
    styleUrls: ['./dishes.component.css']
})
export class DishesComponent implements OnInit {
    dishMaps!: Observable<DishMap[]>;

    constructor(private dishesService: DishesService, public dialog: MatDialog) {
    }

    ngOnInit(): void {
        this.dishMaps = this.dishesService.getDishes();
    }


    addDish(){
        this.dialog.open(DishAddComponent, {data: this.dishMaps})
    }
}
