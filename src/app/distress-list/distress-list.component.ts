import { Component, OnInit } from '@angular/core';
import { DistressService } from '../core';
import { Distress, SearcParams } from '../models';
import { distanceInWords } from "date-fns";
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/concatMap';


@Component({
  selector: 'app-distress-list',
  templateUrl: './distress-list.component.html',
  styleUrls: ['./distress-list.component.css']
})
export class DistressListComponent implements OnInit {
  today = Date.now()
  distresses: Distress[]
  searchParams: Partial<SearcParams> = {
    limit: 20,
    orderBy: "createdAt"
  }
  currInd: number = 0
  disressLength: number
  pages: any[] = []
  constructor(private distressService: DistressService, private route: ActivatedRoute) { }

  distanceInWords(date, suffix?: boolean) {
    return distanceInWords(Date.now(), date, { addSuffix: suffix })
  }

  getFor(i) {
    if (i === 'next') {
      i = this.currInd+1
    }
    if (i === 'prev') {
      i = this.currInd+1
    }
    this.searchParams.offset = 20 * i
    this.currInd = i
    this.distressService.search(this.searchParams)
      .subscribe(distresses => {
        this.distresses = distresses.map(distress => {
          distress.description && distress.description.substr(0, 145)
          return distress
        })
      })
  }

  ngOnInit() {
    this.distressService.distressLength().subscribe(res => {
      this.disressLength = res.result
      let pages = res.result / 20
      for (let x = 0; x <= pages; x++) {
        this.pages.push(x)
      }
    })
    this.route.queryParams.map(params => {
      params['limit'] ? this.searchParams.limit = params['limit'] : null
      params['offset'] ? this.searchParams.offset = params['offset'] : null
      params['title'] ? this.searchParams.title = params['title'] : null
    }).concatMap(() => {
      return this.distressService.search(this.searchParams)
    }).subscribe(distresses => {
      this.distresses = distresses.map(distress => {
        distress.description && distress.description.substr(0, 145)
        return distress
      })
    })
  }

}
