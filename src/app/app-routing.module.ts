import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CreateComponent } from './create/create.component';
import { DistressComponent } from './distress/distress.component';
import { DistressResolver } from './distress-resolver.service';
import { DistressListComponent } from './distress-list/distress-list.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SearchComponent } from './search/search.component';
// import { TopDistressesResolver } from './top-distresses-resolver.service';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent  },
  { path: 'create', component: CreateComponent  },
  { path: 'contact', component: ContactComponent  },
  { path: 'about', component: AboutComponent  },
  { path: 'search', component: SearchComponent, data: { type: 'search' } },
  { path: 'explore', component: SearchComponent, data: { type: 'explore' } },
  { path: 'distresses', component: DistressListComponent, data: { type: 'all' } },
  { path: 'top-distresses', component: DistressListComponent, data: { type: 'top' } },
  { path: 'distress/:id', component: DistressComponent, resolve: { distress: DistressResolver } },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent, pathMatch: 'prefix' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }