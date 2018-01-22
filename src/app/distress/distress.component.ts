import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Distress } from '../models';

@Component({
  selector: 'app-distress',
  templateUrl: './distress.component.html',
  styleUrls: ['./distress.component.css']
})
export class DistressComponent implements OnInit {
  distress: Distress
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe((data: {distress: Distress}) => {
      console.log("Distress", data)
      this.distress = data.distress
    })
  }

}
