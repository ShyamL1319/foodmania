import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ORDERS_CREATE_URL, ORDERS_NEW_FOR_CURRENT_USER, ORDERS_PAY_URL, ORDER_TRACK_URL } from '../shared/constants/urls';
import { Order } from '../shared/models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }
  create(order:Order) { 
    return this.http.post<Order>(ORDERS_CREATE_URL, order);
  }

  newOrderForCurrentUser():Observable<Order> { 
    return this.http.get<Order>(ORDERS_NEW_FOR_CURRENT_USER);
  }

  pay(order:Order):Observable<string> { 
    return this.http.post<string>(ORDERS_PAY_URL, order);
  }


  trackOrderById(id:number):Observable<Order> { 
    return this.http.get<Order>(ORDER_TRACK_URL + id);
  }
}
