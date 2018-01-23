import { Component, OnInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { Cloudinary } from '@cloudinary/angular-5.x';
import { } from '@types/googlemaps';

import { Categories, Distress } from "../models";
import { ApiService } from "../core";
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  categories: string[] = Categories
  @ViewChild("search")
  public searchElementRef: ElementRef;

  distress: Partial<Distress> = {
    title: "",
    category: "",
    description: "",
  }
  map: any
  tags: any[]
  location: string
  showLoading: boolean = false


  constructor(
    private apiService: ApiService,
    private cloudinary: Cloudinary,
    private router: Router,
    private mapsApiLoader: MapsAPILoader,
    private ngZone: NgZone) {
  }

  onSubmit() {
    this.showLoading = true
    let distress = Object.assign({}, this.distress, { tags: this.tags.map(tag => tag.value) })
    // this.apiService.post('/distress/new', this.distress)
    //   .subscribe((distress: Distress) => {
    //     this.showLoading = false
    //     this.router.navigateByUrl('/')
    //   })
  }

  ngOnInit() {
    this.map = {
      latitude: 6.54837,
      longitude: 3.14387,
      zoomLevel: 11,
    }
    let place
    this.mapsApiLoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"],
        componentRestrictions: { country: "ng" }
      })
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          place = autocomplete.getPlace()
          console.log("Location is ", place);
          // set result on imput element
          this.location = place.formatted_address
          //verify result
          if (!place.geometry) {
            return;
          }
          //set latitude, longitude and zoom
          this.map.latitude = place.geometry.location.lat();
          this.map.longitude = place.geometry.location.lng();
          this.map.zoomLevel = 14;

          // set the location on distress
          this.distress.location = {
            name: place.formatted_address,
            points: [place.geometry.location.lat(), place.geometry.location.lng()]
          }

        })
      })
    })

  }
}