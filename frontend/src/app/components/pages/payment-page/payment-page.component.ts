import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/shared/models/order';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.scss']
})
export class PaymentPageComponent implements OnInit {
  order: Order = new Order();
  constructor(private orderService:OrderService, private router:Router) { }

  ngOnInit(): void {
    this.orderService.newOrderForCurrentUser().subscribe(
      {
        next: (order) => { 
          this.order = order;
        },
        error: (error) => { 
          this.router.navigateByUrl("/checkout");
        }
      }
    )
  }

}
