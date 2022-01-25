import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {DishesService, DishMap} from "../dishes.service";
import {AuthService} from "../../auth/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {DishAddComponent} from "../dish-add/dish-add.component";

@Component({
    selector: 'app-manage-dishes',
    templateUrl: './manage-dishes.component.html',
    styleUrls: ['./manage-dishes.component.css']
})
export class ManageDishesComponent implements OnInit {
    dishMaps!: Observable<DishMap[]>;

    constructor(private authService: AuthService, private dishesService: DishesService, public dialog: MatDialog) {
    }

    ngOnInit(): void {
        this.dishMaps = this.dishesService.getDishes();
    }

    addDish(){
        this.dialog.open(DishAddComponent, {data: this.dishMaps})
    }
}
