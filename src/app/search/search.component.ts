import { Component, OnInit } from '@angular/core';
import { Categories } from '../models/index';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  categories = Categories
  constructor() { }

  ngOnInit() {
  }

}
