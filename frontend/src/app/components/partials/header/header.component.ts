import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  cartQuantity = 0;
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getCartObservable().subscribe(newcart => { 
      this.cartQuantity = newcart.totalCount;
    })
  }

}
