import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { icon, LatLng, LatLngExpression, LatLngTuple, LeafletMouseEventHandlerFn, map, Map, marker, Marker, tileLayer } from 'leaflet';
import { LocationService } from 'src/app/services/location.service';
import { Order } from 'src/app/shared/models/order';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnChanges {
  @ViewChild('map', { static: true }) mapRef!: ElementRef;
  private readonly DEFAULT_LATLNG: LatLngTuple = [13.75, 21.62];
  private readonly MARKER_ZOOM_LEVEL = 16;
  private readonly MARKER_ICON = icon({
    iconUrl: 'https://www.mapmarker.app/homepage/app_icon.png',
    iconSize: [42, 42],
    iconAnchor:[21,42]
  })
  map!: Map;
  currentMarker!: Marker;
  @Input()
  order: Order = new Order();
  @Output()
  mapLatLng = new EventEmitter();
  @Input()
  readonly = false;
  constructor(private locationService:LocationService) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.initMap();
    if (!this.order) { 
      this.initMap();
      return;
    }
    if (this.readonly && this.addressLatLng) { 
      this.showLocationOnReadonlyMode();
    }
  }
  showLocationOnReadonlyMode() {
    const m = this.map;
    this.setMarker(this.addressLatLng);
    m.setView(this.addressLatLng, this.MARKER_ZOOM_LEVEL);
    m.dragging.disable();
    m.touchZoom.disable();
    m.doubleClickZoom.disable();
    m.keyboard.disable();
    m.off('click');
    m.tap?.disable();
    this.currentMarker.dragging?.disable()
  }


  initMap() {
    if (this.map) {
      console.log(this.map)
      return;
    }
    this.map = map(this.mapRef.nativeElement, {
      center: [ 22.59372606, 79.453125 ],
      zoom: 3
    });

    const tiles = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

    this.map.on('click', (e: any) => { 
      this.setMarker(e.latlng);
    })

  }
  findMyLoacation() { 
    console.log("finddddd")
    this.locationService.getCurrentLocation().subscribe({
      next: (latlng) => { 
        this.map.setView(latlng, this.MARKER_ZOOM_LEVEL)
        this.setMarker(latlng);
      },
      error : (error) => { alert(error) }
    })
  }

  setMarker(latlng: LatLngExpression) {
    this.addressLatLng = latlng as LatLng;
    if (this.currentMarker) {
      this.currentMarker.setLatLng(latlng);
      return;
    }
    this.currentMarker = marker(latlng, { draggable: true, icon: this.MARKER_ICON }).addTo(this.map)
    
    this.currentMarker.on('dragend', () => { 
      this.addressLatLng = this.currentMarker.getLatLng();
    })
  }

  set addressLatLng(latlng: LatLng) { 
    latlng.lat = parseFloat(latlng.lat.toFixed(8))
    latlng.lng = parseFloat(latlng.lng.toFixed(8))
    this.order.addressLatLng = latlng;
    this.mapLatLng.emit(this.order.addressLatLng);
    console.log(this.order.addressLatLng);
  }

  get addressLatLng() { 
    return this.order.addressLatLng!;
  }
}
