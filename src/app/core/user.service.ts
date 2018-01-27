import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { User } from '../models';
import { JWTService } from './jwt.service';
import { ApiService } from './api.service';
import { SocialAuthService } from './social-auth.service';

@Injectable()
export class UserService {
  public isAuthenticatedSubject = new ReplaySubject<any>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable()
  private currentUser = {}

  constructor(public api: ApiService, private jwt: JWTService, private socialAuth: SocialAuthService) {
    this.populate()
  }

  //THIS RUNS ON START UP TO CHECK IF THE TOKEN ON LOCAL STORAGE IS EXPIRED OR FALSE
  populate() {
    this.socialAuth.getUser()
      .subscribe(user => {
        if (user) {
          this.setAuth(user)
        } else {
          this.purgeAuth()
        }
      })
  }

  // checkAuth(): Observable<any> {
  //   return this.api.get('/users')
  // }
  //THIS STORES TOKEN ON LOCAL STORAGE AND GETS USER DETAILS
  private setAuth(res) {
    this.jwt.setToken(res.token)
    this.isAuthenticatedSubject.next(res)
  }

  //REMOVES TOKEN AND AUTHENTICATION AND RESETS USER  
  purgeAuth() {
    this.isAuthenticatedSubject.next({})
    this.jwt.destroyToken()
  }

  get user() {
    return this.currentUser
  }
  //THIS RUNS ON LOGIN / SIGNUP. LOGS IN AND AUTHENTICATES USER
  // attemptAuth(url, user) {
  //   return this.api.post(url, user).map(res => {
  //     this.setAuth(res.result)
  //     return res
  //   }, err => {
  //     this.purgeAuth()
  //   })
  // }
  // authToken: "EAADDZBp6JGR4BADYet3jwxfq5bIHxA3jBIw2VPWVi6NjmRdYzPXkPe0e1JZBHjRNlByX3skTRtfaemm5PirNwhGU4ZBXlCuSWhTyzV47QCMkOEqEZAlkYHQ9EN650BVoAh1uOlZCuGPraYZCTzUnEZAFIBqw28KlxguhQZCPJNXWOaNCetZAceJUs0RawbZAyIHfsu0ZAGy8nXpxwZDZD"
  // email: "ashinzekene@gmail.com"
  // firstName: "Ekene"
  // id: "1641343272626038"
  // lastName: "Ashinze"
  // name: "Ashinze Ekene"
  // photoUrl: "https://graph.facebook.com/1641343272626038/picture?type=normal"
  // provider: "FACEBOOK"
  createUser(user) {
    let newUser = Object.assign({}, user, { id: user.id })
    return this.api.post('/users/social', newUser)
      .map(user => {
        this.currentUser = user
        this.isAuthenticatedSubject.next(user)
        return user
      })
  }
}