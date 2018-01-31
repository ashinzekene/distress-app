import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { CLOUDINARY_PRESET, CLOUDINARY_URL } from '../config';

@Injectable()
export class CloudinaryUploadService {
  private upload_preset = CLOUDINARY_PRESET
  private cloudinary_url = CLOUDINARY_URL
  constructor(private apiService: ApiService) { }

  // upload(images: any[]) {
  //   let formData = [...images, { upload_preset: this.upload_preset }]
  //   return this.send(formData)
  //     .then(res => {
  //       console.log('images uploaded !!!!!!!', res)
  //     })
  //     .catch(err => {
  //       console.log("Could not upload", err)
  //     })
  // }
  /**
   * 
   * @param data {An array of image files to upload}
   * @description : Creates a formData Array to push in a form data for
   * each image, and uploads them together using Promise.all
   */
  upload(data) {
    console.log('Sending image', data)
    var formData: FormData = new FormData()
    formData.append('file', data)
    formData.append("upload_preset", this.upload_preset)
    return new Promise((resolve, reject) => {
      var xhr: XMLHttpRequest = new XMLHttpRequest()
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          resolve(xhr.response)
        }
      }
      xhr.open("POST", this.cloudinary_url, true)
      xhr.send(formData)
      xhr.onerror = (err) => reject(err.message)
    })
  }

}
