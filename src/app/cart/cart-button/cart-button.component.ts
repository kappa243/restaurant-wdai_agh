import { Component, OnInit } from '@angular/core';
import {CartService} from "../cart.service";

@Component({
  selector: 'cart-button',
  templateUrl: './cart-button.component.html',
  styleUrls: ['./cart-button.component.css']
})
export class CartButtonComponent implements OnInit {

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  }

  itemsInBasket(){
      let count = this.cartService.itemsInBasket();
      if(count > 0){
          return count
      }else{
          return null;
      }
  }
}
