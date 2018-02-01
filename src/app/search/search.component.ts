import { Component, OnInit } from '@angular/core';
import { Categories, Distress, SearcParams } from '../models';
import { DistressService } from '../core';
import { distanceInWordsStrict } from "date-fns";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public distresses: Distress[]
  public categories = Categories
  public orderOptions = [
    { name: 'Date', value: 'date', ascending: true },
    { name: 'Approvals', value: 'approves', ascending: true },
    { name: 'Comments', value: 'comments', ascending: true },
  ]
  public params: Partial<SearcParams> = {
    title: '',
    orderBy: '',
    categories: []
  }
  public noDistress: boolean = false
  public searching: boolean = false
  public hasReturnedResult: boolean = false
  public selectedOrder: string = this.orderOptions[0].name
  public selectedCategories = {}
  public allSelected: boolean = false
  constructor(private distressService: DistressService, private route: ActivatedRoute) { }

  selectAll() {
    if (this.allSelected) {
      this.selectedCategories = {}
    } else {
      this.categories.forEach(category => {
        this.selectedCategories[category] = true
      })
    }
    this.allSelected = !this.allSelected
  }
  search() {
    if (this.params.title.length < 3) {
      return
    }
    this.searching = true
    this.noDistress = false
    let params = Object.assign({}, this.params, { categories: Object.keys(this.selectedCategories) })
    this.distressService.search(params).subscribe((distresses: Distress[]) => {
      this.searching = false
      this.noDistress = !distresses.length
      this.distresses = distresses
    })
  }

  changeOrder(x: number) {
    this.selectedOrder = this.orderOptions[x].name
    this.params.orderBy = this.orderOptions[x].value
  }

  distanceInWords(date, suffix?: boolean) {
    return distanceInWordsStrict(Date.now(), date, { addSuffix: suffix })
  }

  ngOnInit() {
    // runs search on component mount if search params are present on the URL
    this.route.queryParams.subscribe(params => {
      if (Object.keys(params).length > 0) {
        params['limit'] ? this.params.limit = params['limit'] : null
        params['offset'] ? this.params.offset = params['offset'] : null
        params['title'] ? this.params.title = params['title'] : null
        params['orderBy'] ? this.params.orderBy = params['orderBy'] : null
        this.search()
      }
    })
  }

}
