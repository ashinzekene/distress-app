import { Injectable } from '@angular/core';

@Injectable()
export class JWTService {
  token=""
  constructor() {
    this.token = window.localStorage.getItem("token")
  }
  getToken() {
    return window.localStorage.getItem("token") || ""
  }

  setToken(token):void {
    window.localStorage.setItem("token", token)
  }

  destroyToken():void {
    window.localStorage.removeItem("token")
  }
}