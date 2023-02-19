import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/shared/models/order';

@Component({
  selector: 'app-order-track',
  templateUrl: './order-track.component.html',
  styleUrls: ['./order-track.component.scss']
})
export class OrderTrackComponent implements OnInit {

  order!: Order;
  constructor(
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    if (!params.orderId) { 
      return;
    }


    this.orderService.trackOrderById(params.orderId).subscribe((order:any) => {
      this.order = order;
    })
  }

}
