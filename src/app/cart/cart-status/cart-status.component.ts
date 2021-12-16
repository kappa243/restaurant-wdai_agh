import {Component, OnInit} from '@angular/core';
import {CartService} from "../cart.service";

@Component({
    selector: 'cart-status',
    templateUrl: './cart-status.component.html',
    styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {
    price: number = 0;


    constructor(private cartService: CartService) {
    }

    ngOnInit(): void {
    }

    getCost(){
        return this.cartService.getCost();
    }
}
