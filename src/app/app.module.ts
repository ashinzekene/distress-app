import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from "./app-routing.module";
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from "./shared/shared.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from "@agm/core";
import { TagInputModule } from 'ngx-chips';
import { SocialLoginModule, AuthServiceConfig } from "angular4-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angular4-social-login";

// import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { CloudinaryModule, CloudinaryConfiguration, provideCloudinary } from '@cloudinary/angular-5.x';
import * as cloudinary from "cloudinary-core";

import { ApiService, JWTService, DistressService, SocialAuthService, UserService, CloudinaryUploadService } from "./core";
import { DistressResolver } from './distress-resolver.service';
import { FB_APP_ID, GOOGLE_CLIENT_ID, GOOGLE_MAPS_API_KEY } from "./config";
import { TopDistressesResolver } from './top-distresses-resolver.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CreateComponent } from './create/create.component';
import { HttpClientModule } from '@angular/common/http';
import { DistressComponent } from './distress/distress.component';
import { DistressListComponent } from './distress-list/distress-list.component';
import { SearchComponent } from './search/search.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(GOOGLE_CLIENT_ID)
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider(FB_APP_ID)
  }
]);
 
export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreateComponent,
    DistressComponent,
    DistressListComponent,
    SearchComponent,
    NotFoundComponent,
    ContactComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    NgbDropdownModule.forRoot(),
    AppRoutingModule,
    TagInputModule,
    BrowserAnimationsModule,
    SocialLoginModule,
    CloudinaryModule.forRoot(cloudinary, { cloud_name: "ashinzekene" }),
    AgmCoreModule.forRoot({
      apiKey: GOOGLE_MAPS_API_KEY,
      libraries: ["places"]
    }),
    FormsModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [
    ApiService,
    JWTService,
    UserService,
    DistressService,
    DistressResolver,
    SocialAuthService,
    TopDistressesResolver,
    CloudinaryUploadService,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
