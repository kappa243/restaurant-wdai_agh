import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {map, Subscription} from "rxjs";
import {DishesService, DishMap} from "../dishes.service";
import {Dish} from "../../shared/models/dish.model";
import {FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {CartService} from "../../cart/cart.service";
import {AuthService} from "../../auth/auth.service";
import {AngularFireDatabase} from "@angular/fire/compat/database";


@Component({
    selector: 'app-dish-view',
    templateUrl: './dish-view.component.html',
    styleUrls: ['./dish-view.component.css']
})
export class DishViewComponent implements OnInit, OnDestroy {
    id!: string;
    dishMap!: DishMap;
    dish!: Dish;

    canAccess = false;

    count: number = 0;

    comments: DishComment[] = [];

    // validation

    formGroup = new FormGroup({
        title: new FormControl('', Validators.required),
        nick: new FormControl('', Validators.required),
        text: new FormControl('', [Validators.required, Validators.minLength(50), Validators.maxLength(500)]),
        date: new FormControl('')
    })


    private id_sub!: Subscription;
    private id_verification_sub!: Subscription;

    constructor(private authService: AuthService ,private cartService: CartService, private router: Router, private route: ActivatedRoute, private dishesService: DishesService, private db: AngularFireDatabase) {
    }

    ngOnInit(): void {
        this.id_sub = this.route.params.subscribe(params => {
            this.id = params['id'];
            this.id_verification_sub = this.dishesService.getDishes().pipe(map(res => {
                this.dishMap = res.find(dish => dish.key == this.id)!;
                if (this.dishMap == undefined) {
                    this.router.navigate(['/'])
                } else {
                    this.dish = this.dishMap.dish;
                    let basketItem = this.cartService.getBasketItems().find(dish => dish.key == this.dishMap.key);

                    if (basketItem != undefined) {
                        this.count = basketItem.count;
                    }

                    this.cartService.isBought(this.dishMap.key).pipe(map(val => {
                        this.canAccess = (val && !this.authService.getBanState());
                    })).subscribe()

                    this.db.list<DishComment>('/comments/' + this.dishMap.key).valueChanges().pipe(map(val => {
                        this.comments = val;
                    })).subscribe()
                }
            })).subscribe()
        });
    }

    public hasError = (controlName: string, errorName: string) => {
        return this.formGroup.controls[controlName].hasError(errorName);
    }

    onSubmit(formDirective: FormGroupDirective) {
        if (this.formGroup.valid) {
            let values = this.formGroup.value;

            let comment: DishComment = {
                title: values.title,
                nick: values.nick,
                purchase_date: values.date,
                text: values.text
            }

            this.comments.push(comment);
            // this.formGroup.reset({title: '', nick: '', purchase_date: '', text: ''});
            formDirective.resetForm();
            this.formGroup.reset()


            this.db.list('/comments/' + this.dishMap.key).push(comment);
            // TODO comments to database after authentication
        }
    }

    addOrder() {
        if (this.count < this.dish.inStock) {
            this.count++;
        }

        this.cartService.addToBasket(this.dishMap);
    }


    removeOrder() {
        if (this.count > 0) {
            this.count--;
        }
        this.cartService.removeFromBasket(this.dishMap);
    }

    ngOnDestroy(): void {
        this.id_sub.unsubscribe();
        this.id_verification_sub.unsubscribe();
    }

}

interface DishComment {
    title: string;
    nick: string;
    text: string;
    purchase_date: string | null;

}
