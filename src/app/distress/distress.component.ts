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
  public isAuth:boolean = false
  public user:any
  public textComment: string = ""
  
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
          this.userService.createUser(user).subscribe(res => {
            console.log("logged user", res)
          })
        })
      } else {
       this.user = user
       this.isAuth = !!user
      }
    })
  }

  comment() {
    if (this.textComment .length < 5) {
      return
    }
    let comment = {
      distress: this.distress._id,
      email: this.user.email,
      text: this.textComment
    }
    console.log("sending...", comment)
    this.distressService.comment(comment)
      .subscribe(newComment => {
        console.log("Comment ", newComment)
      })
  }

  distanceInWords(date) {
    return distanceInWordsToNow(date)
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
      this.distressService.getComments(data.distress._id)
        .subscribe(comments => {
          console.log('comments ', comments)
          this.distressComments = comments
        })
    })
    this.socialAuth.getUser().subscribe(user => {
      this.isAuth = !!user
      this.user= user
    })
  }
}
