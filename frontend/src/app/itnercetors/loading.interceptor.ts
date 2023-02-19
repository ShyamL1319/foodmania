import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType
} from '@angular/common/http';
import { finalize, Observable, tap } from 'rxjs';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private totalRequests = 0;

  constructor(private loadingService: LoadingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.totalRequests++;
    this.loadingService.setLoading(true);
    // return next.handle(request).pipe(
    //   finalize(() => {
    //     this.totalRequests--;
    //     if (this.totalRequests == 0) {
    //       this.loadingService.setLoading(false);
    //     }
    //   })
    // );

    return next.handle(request).pipe(
      tap({
        next: (event) => { 
          if (event.type === HttpEventType.Response) {
              this.hideLoading()
          }
        },
        error : (_) => { this.hideLoading()}
      })
    )
  }

  hideLoading() { 
      this.totalRequests--;
      if (this.totalRequests === 0) { 
          this.loadingService.setLoading(false);              
      }
  }
}
