import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from "./app-routing.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from "./shared/shared.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from "@agm/core";
import { TagInputModule } from 'ngx-chips';
// import { CloudinaryModule, CloudinaryConfiguration, provideCloudinary } from '@cloudinary/angular-5.x';
import { googleApiKey } from "./config";
// import * as cloudinary from "cloudinary-core";

import { ApiService, JWTService, DistressService } from "./core";
import { DistressResolver } from './distress-resolver.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CreateComponent } from './create/create.component';
import { HttpClientModule } from '@angular/common/http';
import { DistressComponent } from './distress/distress.component';
import { DistressListComponent } from './distress-list/distress-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreateComponent,
    DistressComponent,
    DistressListComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    TagInputModule,
    BrowserAnimationsModule,
    // CloudinaryModule.forRoot(cloudinary, cloudinary_config),
    AgmCoreModule.forRoot({
      apiKey: googleApiKey,
      libraries: ["places"]
    }),
    FormsModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [
    ApiService,
    JWTService,
    DistressResolver,
    DistressService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
