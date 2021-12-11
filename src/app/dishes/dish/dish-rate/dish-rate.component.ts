import {Component, Input, OnInit} from '@angular/core';
import {DishesService, DishMap} from "../../dishes.service";
import {DishRate} from "../../../shared/models/dish.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {config} from "rxjs";

@Component({
    selector: 'app-dish-rate',
    templateUrl: './dish-rate.component.html',
    styleUrls: ['./dish-rate.component.css']
})
export class DishRateComponent implements OnInit {
    @Input() dishMap!: DishMap;

    sessionID!: string;

    stars: number[] = [1, 2, 3, 4, 5];
    selectedStars: boolean[] = [false, false, false, false, false];

    sessionStorage = window.sessionStorage;
    userSelected!: DishRate | undefined;
    dishRates!: DishRate[] | undefined;

    constructor(private dishesServices: DishesService, private snackBar: MatSnackBar) {
        let session = window.localStorage.getItem('sessionID');
        this.sessionID = session ? session : '';
    }

    ngOnInit(): void {
        // TODO auth rating; for now random session key

        if (this.dishMap.dish.rates == undefined) {
            this.dishMap.dish.rates = [];
            this.rate(0);
        }
        this.dishRates = this.dishMap.dish.rates;
        this.userSelected = this.dishRates.find(rate => rate.user == this.sessionID); //fake user finding

        if (this.userSelected == undefined) {
            this.rate(this.averageRates());
        } else {
            this.rate(this.userSelected.rate);
        }
    }

    selectStar(star: number) {
        if (this.userSelected == undefined) {
            this.userSelected = {user: this.sessionID, rate: 0};
            this.dishRates?.push(this.userSelected);
        }

        this.userSelected.rate = star;
        this.rate(star);

        this.dishesServices.updateDish(this.dishMap.key, this.dishMap.dish).then(() => {
            this.snackBar.open("Rating successfully assigned",undefined, {
                duration: 3000
            });
        })

        // console.log('Value of star', star);
        // console.log(this.dishRates)
    }

    rate(value: number) {
        let i = 0;
        for (; i < value; i++) {
            this.selectedStars[i] = true;
        }
        for (; i < 5; i++) {
            this.selectedStars[i] = false;
        }
    }

    averageRates() {
        let sum = 0;
        this.dishRates!.forEach(rate => {
            sum += rate.rate;
        })
        return Math.round(sum /= this.dishRates!.length);
    }
}
