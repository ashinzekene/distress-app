import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { JWTService } from "./jwt.service";
import { Observable } from 'rxjs/Observable';
import { environment } from "../../environments/environment";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ApiService {
  constructor(private httpClient: HttpClient, private jwt: JWTService) {
   }
  baseUrl = environment.api_url

  setHeaders() {
    var headers = {
      'Content-type': 'application/json',
    }
    if (this.jwt.getToken()) {
      headers['Authorization'] = `Bearer ${this.jwt.getToken()}`
    }
    return new HttpHeaders(headers)
  }

  get(url: string): Observable<any> {
    return this.httpClient.get(this.baseUrl+url, {headers: this.setHeaders()}).map(res => {
      return res
    })
  }

  post(url: string, body: Object): Observable<any> {
    return this.httpClient.post(this.baseUrl+url, body, {headers: this.setHeaders()})
  }

  delete(url:string): Observable<any> {
    return this.httpClient.delete(this.baseUrl+ url, {headers: this.setHeaders()})
  }
  
  patch(url:string, body: Object): Observable<any> {
    return this.httpClient.patch(this.baseUrl+ url, {headers: this.setHeaders()})
  }

  funct(url, data) {
    var formData: FormData = new FormData()
    for(let x in data) {
      formData.append(x, data[x])
    }
    return this.post(url, formData)
  }
  postFormData(url: string, data: object, absolute=false): Promise<any> {
    var formData: FormData = new FormData()
    for(let x in data) {
      formData.append(x, data[x])
    }
    return new Promise((resolve, reject) => {
      var xhr: XMLHttpRequest = new XMLHttpRequest()
      xhr.onreadystatechange = () => {
        if(xhr.readyState === 4 &&xhr.status === 200) {
          resolve(xhr.response)
        }
      }
      if (absolute) {
        xhr.open("POST", url, true)
      } else {
        xhr.open("POST", this.baseUrl+ url, true)
      }
      if (this.jwt.getToken()) {
        xhr.setRequestHeader('Authorization', `Bearer ${this.jwt.getToken()}`)
      }
      xhr.send(formData)
      xhr.onerror = (err)=>reject(err.message)
    })
  }
    
  handleError(err) {
    return Observable.throw(err.json())
  }
}