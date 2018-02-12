import { Component, OnInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { } from '@types/googlemaps';

import { Categories, Distress, User } from "../models";
import { ApiService, CloudinaryUploadService, SocialAuthService, UserService } from "../core";
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/switchMap'

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
  file: File
  fileUrl: string = ""
  user: any = {}


  constructor(
    private apiService: ApiService,
    private router: Router,
    private socialAuth: SocialAuthService,
    private userService: UserService,
    private cloudinaryUpload: CloudinaryUploadService,
    private mapsApiLoader: MapsAPILoader,
    private ngZone: NgZone) {
  }

  onSubmit() {
    this.showLoading = true
    // upload image to cloudinary
    if (!this.fileUrl) {
      this.createDistress()
    } else {
      this.cloudinaryUpload.upload(this.file)
        .then((res:any) => {
          this.createDistress(JSON.parse(res))
          console.log("Upload success", res)
        })
        .catch(err => {
          console.log("Upload error", err)
          this.invalid_sample_graphic_text = "Could not upload image please try another"
        })
    }
  }

  createDistress(res?) {
    let distress
    let tags = this.tags.map(tag => tag.value)
    if (res) {
      console.log("image added", res)
      distress = Object.assign({}, this.distress, { tags, image: res.secure_url })
    } else {
      distress = Object.assign({}, this.distress, { tags })
    }
    console.log(distress)
    this.apiService.post('/distress/new', distress)
      .catch(err => {
        console.error('An error occured')
        this.showLoading = false
        return Observable.create()
      })
      .subscribe((distress) => {
        console.log("Distress", distress)
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
    this.displayImage(fileList.item(0))
  }

  displayImage(file: File) {
    let url = window.URL.createObjectURL(file)
    this.file = file
    this.fileUrl = url
  }

  
  signIn(provider?) {
    console.log("authenticating...")
    this.userService.logIn()
      .subscribe(user => {
        this.user = user
      })
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