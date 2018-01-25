import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Distress } from '../models';
import { SocialAuthService } from '../core';

@Component({
  selector: 'app-distress',
  templateUrl: './distress.component.html',
  styleUrls: ['./distress.component.css']
})
export class DistressComponent implements OnInit {
  distress: Distress
  constructor(private route: ActivatedRoute, private meta: Meta, private socialAuth: SocialAuthService) { }

  comment() {
    this.socialAuth.getUser().subscribe(user => {
      console.log("authenticating...")
      if (!user) {
        this.socialAuth.signInWithFB()
      } else {
        console.log(user)
      }
    })
  }

  ngOnInit() {
    this.route.data.subscribe((data: { distress: Distress }) => {
      this.distress = data.distress
      this.meta.addTags([
        { name: 'og:url', content: window.location.href },
        { name: 'og:type', content: "article" },
        { name: 'og:title', content: data.distress.title },
        { name: 'og:description', content: data.distress.description.substring(0, 51) },
        { name: 'og:keywords', content: data.distress.tags && data.distress.tags.join(",") }
      ])
    })
  }

}
