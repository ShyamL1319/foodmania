import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Order } from 'src/app/shared/models/order';
//window.paypal are similiar
declare var paypal: any;
@Component({
  selector: 'paypal-button',
  templateUrl: './paypal-button.component.html',
  styleUrls: ['./paypal-button.component.scss']
})
export class PaypalButtonComponent implements OnInit, AfterViewInit {

  @Input()
  order!: Order;
  @ViewChild('paypal', { static: true })
  paypalElement!: ElementRef;
  constructor(
    private orderService:OrderService,
    private cartService: CartService,
    private router: Router,
    private snackbarService:SnackbarService,
  ) { }
  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    console.log(this.order);
    const self = this;
    paypal.Buttons(
      {
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: 'USD',
                  value: self.order.totalPrice,
                }
              }
            ]
          })
        },
        onApprove: async (data: any, actions: any) => {
          const payment = await actions.order.capture();
          this.order.paymentId = payment.id;
          self.orderService.pay(this.order).subscribe(
            {
              next: (orderId: any) => {
                self.cartService.clearCart();
                self.router.navigateByUrl('/track/' + orderId);
                self.snackbarService.snackPositionTopCenter("Payment Saved successfully!")
              },
              error: (error: any) => {
                this.snackbarService.snackPositionTopCenter("Payment Saved Failed");
              }
            }
          )
        },
        onError: (err: any) => {
          this.snackbarService.snackPositionTopCenter("Payment Failed");
          console.log(err);
        }
      }
    ).render(this.paypalElement.nativeElement);
  }

}
