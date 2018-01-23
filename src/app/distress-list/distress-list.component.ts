import { Component, OnInit } from '@angular/core';
import { DistressService } from '../core';
import { Distress } from '../models/index';

@Component({
  selector: 'app-distress-list',
  templateUrl: './distress-list.component.html',
  styleUrls: ['./distress-list.component.css']
})
export class DistressListComponent implements OnInit {
  distresses: Distress[]
  searchParams = {
    limit: 20,
    orderBy: "createdAt"
  }
  constructor(private distressService: DistressService) { }

  ngOnInit() {
    this.distressService.search(this.searchParams)
      .subscribe((distresses: Distress[]) => {
        this.distresses = distresses
      })
  }

}
