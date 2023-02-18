import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/food';
import { FOODS_BY_ID_URL } from 'src/app/shared/constants/urls';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  foods: Food[] = []
  FOODS_BY_ID_URL = FOODS_BY_ID_URL
  constructor(private foodService:FoodService, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => { 
      let foodObservable: Observable<Food[]>;
      if (params.searchTerm) {
        foodObservable = this.foodService.getAllFoodBySearchTerm(params.searchTerm);
      } else if (params.tag) { 
        foodObservable = this.foodService.getAllFoodByTags(params.tag);
      } else { 
        foodObservable = this.foodService.getAll()
      }
      foodObservable.subscribe(foods => { 
           this.foods = foods;
        });
    })


  }

}
