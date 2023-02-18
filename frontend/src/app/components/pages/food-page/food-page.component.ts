import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/food';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.scss']
})
export class FoodPageComponent implements OnInit {
  food: any = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private foodService: FoodService,
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => { 
      console.log(params);
      if (params && params?.id) { 
        console.log(params?.id)
        this.foodService.getFoodById(params?.id).subscribe((food:any) => { 
           console.log(food)
           this.food = food[0];
        });;
      }
    })
  }

  addToCart() { 
    this.cartService.addToCart(this.food);
    this.router.navigateByUrl("/cart-page");
  }

}
