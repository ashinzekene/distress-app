import { Component, OnInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';
import { Cloudinary } from '@cloudinary/angular-5.x';
import {} from '@types/googlemaps'; 

import { Categories, Distress } from "../models";
import { ApiService } from "../core";
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  categories:string[] = Categories
  public uploader: FileUploader = new FileUploader({url: environment.api_url+""});
  @ViewChild("search")
  public searchElementRef: ElementRef;

  distress: Partial<Distress>= {
    title: "",
    category: "",
    description: "",
    location: "",
    tags: []
  }
  map:any


  constructor(
    private apiService: ApiService,
    private cloudinary: Cloudinary,
    private router: Router,
    private mapsApiLoader: MapsAPILoader,
    private ngZone: NgZone ) {
  }

  onSubmit() {
    this.apiService.post('/distress/new', this.distress)
      .subscribe((distress: Distress) => {
        console.log("Created")
        this.goHome()
      })
  }

  goHome() {
    this.router.navigateByUrl('/')
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
        componentRestrictions: { country: "ng"}
      })
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(()=> {
          place = autocomplete.getPlace()
          console.log("Location is ", place, [place.geometry.location.lat(), place.geometry.location.lng()]);
          //verify result
          if (!place.geometry) {
            return;
          }
          //set latitude, longitude and zoom
          this.map.latitude = place.geometry.location.lat();
          this.map.longitude = place.geometry.location.lng();
          this.map.zoomLevel = 16;
        })
      })
    })

    //Cloudinary config
    const uploaderOptions: FileUploaderOptions = {
      url: `https://api.cloudinary.com/v1_1/${this.cloudinary.config().cloud_name}/upload`,
      // Upload files automatically upon addition to upload queue
      autoUpload: true,
      // Use xhrTransport in favor of iframeTransport
      isHTML5: true,
      // Calculate progress independently for each uploaded file
      removeAfterUpload: true,
      // XHR request headers
      headers: [
        {
          name: 'X-Requested-With',
          value: 'XMLHttpRequest'
        }
      ]
    };
    this.uploader = new FileUploader(uploaderOptions);
  }

}
