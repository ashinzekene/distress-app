import { Component, OnInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps'; 

import { Categories, Distress } from "../models";
import { ApiService } from "../core";
import { FileUploader } from 'ng2-file-upload';
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
    description: ""
  }

  constructor(private apiService: ApiService, private router: Router, private mapsApiLoader: MapsAPILoader, private ngZone: NgZone ) {
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
    this.mapsApiLoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"],
        componentRestrictions: { country: "ng"}
      })
    })
  }

}
