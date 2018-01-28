import { Component, OnInit } from '@angular/core';
import { Distress } from '../models/index';
import { DistressService } from '../core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  distresses: Distress[]
  distressLength: number 
  commentLength: number 
  constructor(private distressService: DistressService) { }

  ngOnInit() {
    let params = {
      sort: "approves",
      limit: 3
    }
    this.distressService.search(params)
      .subscribe((distresses: Distress[]) => {
        console.log("GOTTEN ", distresses)
        this.distresses = distresses
      })
    this.distressService.distressLength()
      .subscribe(res => {
        this.distressLength = res.result
      })
    this.distressService.commentLength()
      .subscribe(res => {
        this.commentLength = res.result
      })
  }

}
