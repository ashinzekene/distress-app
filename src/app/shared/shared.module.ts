import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HeroComponent } from './hero/hero.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
  ],
  exports: [HeaderComponent, FooterComponent, HeroComponent, SidebarComponent],
  declarations: [HeaderComponent, FooterComponent, HeroComponent, SidebarComponent]
})
export class SharedModule { }
