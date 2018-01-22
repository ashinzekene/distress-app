import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { User } from "../models";
import { JWTService } from "./jwt.service";
import { ApiService } from "./api.service";

@Injectable()
export class UserService {
  private currentUser: Partial<User> = {
    token: "",
    email: ""
  }
  public isAuthenticatedSubject = new ReplaySubject<Partial<User>>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable()

  constructor(public api: ApiService, private jwt: JWTService) { 
    this.populate()
  }
  
  //THIS RUNS ON START UP TO CHECK IF THE TOKEN ON LOCAL STORAGE IS EXPIRED OR FALSE
  populate() {
    if(this.jwt.getToken()) {
      this.api.get("/users").subscribe(res => {
        this.setAuth(res.result)
      }, err => {
        this.purgeAuth()
      })
    }
  }

  get user(): Partial<User> {
    return this.currentUser
  }

  checkAuth():Observable<any> {
    return this.api.get("/users")
  }
  //THIS STORES TOKEN ON LOCAL STORAGE AND GETS USER DETAILS
  private setAuth(res) {
    this.currentUser = res
    this.jwt.setToken(res.token)
    this.isAuthenticatedSubject.next(res)
  }
  
  //REMOVES TOKEN AND AUTHENTICATION AND RESETS USER  
  purgeAuth() {
    this.isAuthenticatedSubject.next({})
    this.currentUser = {
      email: ""
    }
    this.jwt.destroyToken()
  }
  
  //THIS RUNS ON LOGIN / SIGNUP. LOGS IN AND AUTHENTICATES USER
  attemptAuth(url, user) {
    return this.api.post(url, user).map(res => {
      this.setAuth(res.result)
      return res
    }, err => {
      this.purgeAuth()
    })
  }
}