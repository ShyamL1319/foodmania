import { Injectable } from '@angular/core';
import { LatLngLiteral } from 'leaflet';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() { }

  getCurrentLocation(): Observable<LatLngLiteral> { 
    return new Observable(observer => { 
      if (!navigator.geolocation) return;
      console.log("till heree")
      return navigator.geolocation.getCurrentPosition(
        (pos) => { 
          console.log(pos)
          observer.next({ lat: pos.coords.latitude, lng: pos.coords.longitude })
          observer.complete()
        },
        (error) => { 
          console.log(error)

          observer.error(error)
          observer.complete();
        }

      )
    });
  }

}
