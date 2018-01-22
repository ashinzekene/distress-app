import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from "./app-routing.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from "./shared/shared.module";
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from "@agm/core";
import { FileUploadModule } from 'ng2-file-upload'

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
    FileUploadModule,
    AgmCoreModule.forRoot({
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
