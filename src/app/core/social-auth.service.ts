import { Injectable } from '@angular/core';
import { AuthService } from "angular4-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angular4-social-login";

@Injectable()
export class SocialAuthService {
  
  constructor(private authService: AuthService) { }

  private signInWithGoogle():Promise<any> {
    return this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  private signInWithFB():Promise<any> {
    return this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signIn(provider): Promise<any> {
    if (provider === 'facebook') {
      return this.signInWithFB()
    } else {
      return this.signInWithGoogle()
    }
  }

  signOut(): void {
    this.authService.signOut();
  }

  getUser() {
    return this.authService.authState
  }

}