import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { USER_LOGIN_URL, USER_REGISTER_URL } from '../shared/constants/urls';
import { IUserLogin } from '../shared/interfaces/user.login';
import { IUserRegister } from '../shared/interfaces/user.register';
import { User } from "../shared/models/user"
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public userObservable: Observable<User>;
  USER_KEY = "user";
  constructor(
    private httpService: HttpClient,
    private snackbarService:SnackbarService,
  ) {
    this.userObservable = this.userSubject.asObservable();
  }
  
  public get currentUser():User { 
    return this.userSubject.value;
  }
  login(userLogin: IUserLogin): Observable<User> { 

    return this.httpService.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user:User) => { 
          this.userSubject.next(user);
          this.setUserToLocalStorage(user);
          this.snackbarService.snackPositionTopCenter(`
          Welcome to FoodMania ${user.name}! 
          Login Success.`);
        },
        error: (errorResponse) => { 
            //this.toastrService.error(errorResponse.error,'Login Failed')
          this.snackbarService.snackPositionTopCenter(`
            FoodMania ${errorResponse.error}! 
            Login Failed.`);
        }
      })
    );
  }

  register(userRegister: IUserRegister): Observable<User> {
    return this.httpService.post<User>(USER_REGISTER_URL, userRegister).pipe(
      tap({
        next: (user: User) => {
          this.userSubject.next(user);
          this.setUserToLocalStorage(user);
          this.snackbarService.snackPositionTopCenter(`
          Welcome to FoodMania ${user.name}! 
          Registeration Success.`);
         },
        error: (errorResponse) => {
          this.snackbarService.snackPositionTopCenter(`
            FoodMania ${errorResponse.error}! 
            Registration Failed.`);
        }
      })
    ); 
  }

  logout() {
    this.userSubject.next(new User());
    localStorage.removeItem(this.USER_KEY);
    window.location.reload()
   }


  setUserToLocalStorage(user:User) { 
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  getUserFromLocalStorage():User { 
    const u = localStorage.getItem(this.USER_KEY);
    if (u) {
      return JSON.parse(u) as User;
    } else { 
      return new User();
    }
  }


}
