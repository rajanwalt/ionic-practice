import { Component, OnInit, ViewChild, ElementRef, Input, AfterContentInit, SimpleChanges } from '@angular/core';
declare var google: any;

interface MapLocation  {
  lat : number;
  lng : number;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, AfterContentInit {

  @ViewChild('Map', {static: true}) public mapElement: ElementRef;
  @Input() location: MapLocation = { lat : 12.975971, lng : 80.22120919999998};
  
  mapOptions: any;
  marker: any;
  stateData: any = {};

  setMap(latLng = this.location)  {
    if(this.mapElement)  {
      let mapOptions = {
        center: latLng,
        zoom: 21,
        mapTypeControl: false
      };
      let markerOptions = {
        position: null, 
        map: null, 
        title: null
      };

      let map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      markerOptions.position = latLng;
      markerOptions.map = map;
      markerOptions.title = 'Shop Location';
      
      this.marker = new google.maps.Marker(markerOptions);
    }
  }
  
  constructor() { }

  ngOnInit() {
    if(this.location && this.location.lat) {
      this.setMap();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    for(const propName in changes)  {
      let change = changes[propName];

      if(propName == "location")  {
        this.setMap(change.currentValue)
      } 
    }
  }
    

  ngAfterContentInit()  {
    if(this.location && this.location.lat) {
      this.setMap();
    }
  }

}
