import { Component, OnInit } from '@angular/core';
import { DistressService } from '../core';
import { Distress } from '../models/index';
import { distanceInWords } from "date-fns";

@Component({
  selector: 'app-distress-list',
  templateUrl: './distress-list.component.html',
  styleUrls: ['./distress-list.component.css']
})
export class DistressListComponent implements OnInit {
  today = Date.now()
  distresses: Distress[]
  searchParams = {
    limit: 20,
    orderBy: "createdAt"
  }
  constructor(private distressService: DistressService) { }

  distanceInWords(date, suffix?: boolean) {
    return distanceInWords(Date.now(), date, { addSuffix: suffix })
  }

  ngOnInit() {
    this.distressService.search(this.searchParams)
      .subscribe((distresses: Distress[]) => {
        this.distresses = distresses
      })
  }

}
