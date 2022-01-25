import {Component, Input, OnInit} from '@angular/core';
import {DishesService, DishMap} from "../dishes.service";
import {DishRating} from "../../shared/models/dish.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../../auth/auth.service";

@Component({
    selector: 'dish-rating',
    templateUrl: './dish-rating.component.html',
    styleUrls: ['./dish-rating.component.css']
})
export class DishRatingComponent implements OnInit {
    @Input() dishMap!: DishMap;

    sessionID!: string;

    stars: number[] = [1, 2, 3, 4, 5];
    selectedStars: boolean[] = [false, false, false, false, false];

    sessionStorage = window.sessionStorage;
    userSelected!: DishRating | undefined;
    dishRatings!: DishRating[] | undefined;

    constructor(private dishesServices: DishesService, private authSerivce: AuthService, private snackBar: MatSnackBar) {
        let session = window.localStorage.getItem('sessionID');
        this.sessionID = session ? session : '';
    }

    ngOnInit(): void {
        // TODO auth rating; for now random session key

        if (this.dishMap.dish.ratings == undefined) {
            this.dishMap.dish.ratings = [];
            this.rate(0);
        }
        this.dishRatings = this.dishMap.dish.ratings;
        this.userSelected = this.dishRatings.find(rate => rate.user == this.sessionID); //fake user finding

        if (this.userSelected == undefined) {
            this.rate(this.averageRates());
        } else {
            this.rate(this.userSelected.rating);
        }
    }

    selectStar(star: number) {
        if (this.authSerivce.isLoggedIn()) {
            if (this.userSelected == undefined) {
                this.userSelected = {user: this.sessionID, rating: 0};
                this.dishRatings?.push(this.userSelected);
            }

            this.userSelected.rating = star;
            this.rate(star);

            this.dishesServices.updateDish(this.dishMap.key, this.dishMap.dish).then(() => {
                this.snackBar.open("Rating successfully assigned", undefined, {
                    duration: 3000
                });
            })

            // console.log('Value of star', star);
            // console.log(this.dishRates)
        }
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
        this.dishRatings!.forEach(rate => {
            sum += rate.rating;
        })
        return Math.round(sum /= this.dishRatings!.length);
    }
}
