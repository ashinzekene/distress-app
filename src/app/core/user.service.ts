import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { User } from '../models';
import { JWTService } from './jwt.service';
import { ApiService } from './api.service';
import { SocialAuthService } from './social-auth.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class UserService {
  // public isAuthenticatedSubject = new ReplaySubject<any>(1);
  // public isAuthenticated = this.isAuthenticatedSubject.asObservable()
  public currentUser = new BehaviorSubject<Partial<User>>({})

  constructor(public api: ApiService, private jwt: JWTService, private socialAuth: SocialAuthService) {}

  //THIS RUNS ON START UP TO CHECK IF THE TOKEN ON LOCAL STORAGE IS EXPIRED OR FALSE
  populate() {
    let createdUser
    this.socialAuth.getUser()
      .switchMap(user => {
        if (!user || !user.email) {
          throw new Error("chaiii")
        }
        createdUser = user
        return this.getByEmail(user && user.email)
      })
      .catch(err => this.createUser(createdUser))
      .subscribe((dbUser: User) => {
        this.currentUser.next(dbUser)
      })
  }

  
  get user() {
    return this.currentUser
  }
  
  getByEmail(email) {
    return this.api.post('/users/email', { email })
  }

  createUser(user) {
    let newUser = Object.assign({}, user)
    return this.api.post('/users/social', newUser)
      .map(user => {
        this.currentUser.next(user)
        return user
      })
  }

  // private setAuth(res) {
  //   this.jwt.setToken(res.token)
  //   this.isAuthenticatedSubject.next(res)
  // }

  // //REMOVES TOKEN AND AUTHENTICATION AND RESETS USER  
  // purgeAuth() {
  //   this.isAuthenticatedSubject.next({})
  //   this.jwt.destroyToken()
  // }
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
}