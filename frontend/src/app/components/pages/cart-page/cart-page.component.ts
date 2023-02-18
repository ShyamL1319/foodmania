import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/shared/models/cart';
import { CartItem } from 'src/app/shared/models/cart-item';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {
  cart!: Cart;
  constructor(private cartService: CartService) { 
    this.cartService.getCartObservable().subscribe((cart) => { 
      this.cart = cart;
    })
  }

  ngOnInit(): void {
  }

  removeFromCart(cartItem: CartItem) { 
    this.cartService.removeFromCart(cartItem.food.id+"");
  }

  changeQuantity(cartItem:CartItem, quantityStr:string) { 
    let quantity = +quantityStr;
    this.cartService.changeQuantity(cartItem.food.id + "", quantity);
    console.log(this.cart);
  }

}
