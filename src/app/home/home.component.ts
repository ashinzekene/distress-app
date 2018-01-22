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
  constructor(private distressService: DistressService) { }

  ngOnInit() {
    let params = {
      sort: "approves",
      limit: 5
    }
    this.distressService.search(params)
      .subscribe((distresses: Distress[]) => {
        this.distresses = distresses
      })
  }

}