import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CreateComponent } from './create/create.component';
import { DistressComponent } from './distress/distress.component';
import { DistressResolver } from './distress-resolver.service';
import { DistressListComponent } from './distress-list/distress-list.component';

const routes: Routes = [
  { path: 'create', component: CreateComponent  },
  { path: 'distresses', component: DistressListComponent  },
  { path: 'distress/:id', component: DistressComponent, resolve: { distress: DistressResolver } },
  { path: '', component: HomeComponent, pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }