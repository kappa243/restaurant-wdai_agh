import {Component, OnInit} from '@angular/core';
import {DishesService, DishMap} from "../dishes.service";
import {Observable} from "rxjs";

@Component({
    selector: 'dishes-list',
    templateUrl: './dishes-list.component.html',
    styleUrls: ['./dishes-list.component.css']
})
export class DishesListComponent implements OnInit {
    dishMaps!: Observable<DishMap[]>;

    constructor(private dishesService: DishesService) {
        this.dishMaps = this.dishesService.getDishes();
    }

    ngOnInit(): void {
    }


}
