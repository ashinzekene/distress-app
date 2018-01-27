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

  signIn(provider) {
    this.socialAuth.getUser().subscribe(user => {
      console.log("authenticating...")
      if (!user) {
        this.socialAuth.signIn(provider).then(user => {
          this.userService.createUser(user).subscribe(dbUser => {
            this.user = dbUser
            this.isAuth = !!dbUser
          })
        })
      } else {
        this.userService.getByEmail(user.email).subscribe(user => {
          this.user = user
          this.isAuth = !!user
        })
      }
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
    console.log("sending...", comment)
    this.distressService.comment(comment)
      .subscribe(newComment => {
        this.creatingComment = false
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

  ngOnInit() {
    this.route.data.subscribe((data: { distress: Distress }) => {
      this.distress = data.distress
      console.log(data.distress)
      this.meta.addTags([
        { name: 'og:url', content: window.location.href },
        { name: 'og:type', content: "article" },
        { name: 'og:title', content: data.distress.title },
        { name: 'og:description', content: data.distress.description.substring(0, 51) },
        { name: 'og:keywords', content: data.distress.tags && data.distress.tags.join(",") }
      ])
      this.getComments(data.distress._id)
    })
    this.socialAuth.getUser().subscribe(user => {
      this.isAuth = !!user
      this.user = user
    })
  }
}
