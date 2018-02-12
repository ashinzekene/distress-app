import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Distress } from '../models';
import { SocialAuthService, UserService, DistressService } from '../core';
import { distanceInWordsToNow } from 'date-fns';

@Component({
  selector: 'app-distress',
  templateUrl: './distress.component.html',
  styleUrls: ['./distress.component.css']
})
export class DistressComponent implements OnInit {
  public distress: Distress
  public distressComments: any[]
  public isAuth: boolean = false
  public user: any
  public textComment: string = ""

  public creatingComment: boolean = false

  constructor(
    private route: ActivatedRoute,
    private meta: Meta,
    private distressService: DistressService,
    private userService: UserService,
    private socialAuth: SocialAuthService) { }

  signIn(provider?) {
    console.log("authenticating...")
    this.userService.logIn()
      .subscribe(user => {
        console.log("Logged in as", user)
        this.user = user
        this.isAuth = !!user
      })
  }

  comment() {
    if (this.textComment.length < 5) {
      return
    }
    this.creatingComment = true
    let comment = {
      distress: this.distress._id,
      user: this.user._id,
      text: this.textComment
    }
    this.distressService.comment(comment)
      .subscribe(newComment => {
        this.creatingComment = false
        this.textComment = ""
        this.getComments(this.distress._id)
      })
  }

  distanceInWords(date) {
    return distanceInWordsToNow(date)
  }

  getComments(id) {
    this.distressService.getComments(id)
      .subscribe(comments => {
        this.distressComments = comments
      })
  }

  ngOnDestroy() {
    this.meta.removeTag("property='og:url'");
    this.meta.removeTag("property='og:type'");
    this.meta.removeTag("property='og:title'");
    this.meta.removeTag("property='og:description'");
    this.meta.removeTag("property='og:keywords'");
  }

  ngOnInit() {
    // Get distress
    this.route.data.subscribe((data: { distress: Distress }) => {
      this.distress = data.distress
      // Set meta tags
      let distress = [
        { name: 'og:url', content: window.location.href },
        { name: 'og:type', content: 'article' },
        { name: 'og:title', content: data.distress.title },
        { name: 'og:description', content: data.distress.description.substring(0, 100) }
      ]
      if (data.distress.image) {
        distress.push({ name: 'og:image', content: data.distress.image })
      }
      if (data.distress.tags && data.distress.tags.length) {
        distress.push({ name: 'og:keywords', content: data.distress.tags.join(',') })
      }
      this.meta.addTags(distress, true)
      // Login User
      this.signIn()
      // Get distress comments
      this.getComments(data.distress._id)
    })
  }

}
