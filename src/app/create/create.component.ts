import { Component, OnInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
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
  tags: any[] = []
  location: string = ""
  showLoading: boolean = false

  sample_graphic_invalid = false
  sample_graphic_selected = false
  invalid_sample_graphic_text: string = ''
  files = []  


  constructor(
    private apiService: ApiService,
    private router: Router,
    private mapsApiLoader: MapsAPILoader,
    private ngZone: NgZone) {
  }

  onSubmit() {
    this.showLoading = true
    let images = this.files.map(img => img.file)
    let distress = Object.assign({}, this.distress, { tags: this.tags.map(tag => tag.value), images })
    console.log(distress)
    this.apiService.post('/distress/new', this.distress)
      .subscribe((distress: Distress) => {
        console.log(distress)
        this.showLoading = false
        this.router.navigateByUrl('/')
      })
  }


  uploadFile(e) {
    let fileList: FileList = e.target.files
    if (fileList.item(0) && fileList.item(0).size > 2048000) {
      this.sample_graphic_invalid = true
      this.sample_graphic_selected = true
      this.invalid_sample_graphic_text = `The image size is ${(fileList.item(0).size / 1024000).toFixed(3)}MB. Should be less than 2MB`
      return
    }
    if (fileList.item(0).type.indexOf("image") === -1) {
      this.sample_graphic_invalid = true
      this.sample_graphic_selected = true
      this.invalid_sample_graphic_text = `The selected file format is not supported. Please upload a PNG/GIF/JPG file `
      return
    }
    this.sample_graphic_invalid = false
    this.sample_graphic_selected = true
    this.invalid_sample_graphic_text = ""
    this.insertImage(fileList.item(0))
  }
  
  insertImage(file: File) {
    // var reader: FileReader = new FileReader()
    let url = window.URL.createObjectURL(file)
    this.files.push({ file, url})
    console.log(this.files)
    // reader.readAsDataURL(file)
    // reader.onload = (e: any) => {
    //   this.previewImage.nativeElement.src = e.target.result
    // }
  }

  removeImage(i) {
    this.files = this.files.filter((img, ind) => ind !== i)
  }
  
  ngOnInit() {
    this.map = {
      latitude: 6.54837,
      longitude: 3.14387,
      zoomLevel: 14,
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