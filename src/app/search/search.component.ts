import { Component, OnInit } from '@angular/core';
import { Categories, Distress } from '../models';
import { DistressService } from '../core';
import { distanceInWordsStrict } from "date-fns";

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
  public params = {
    title: '',
    orderBy: '',
    ascending: true,
    categories: []
  }
  public noDistress: boolean = false
  public searching: boolean = false
  public hasReturnedResult: boolean = false
  public selectedOrder: string = this.orderOptions[0].name
  public selectedCategories = {}
  public allSelected: boolean = false
  constructor(private distressService: DistressService) { }

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
      console.log(`fetched ${distresses}`)
    })
    console.log(params)
  }

  changeOrder(x: number) {
    this.selectedOrder = this.orderOptions[x].name
    this.params.orderBy = this.orderOptions[x].value
  }

  distanceInWords(date, suffix?: boolean) {
    return distanceInWordsStrict(Date.now(), date, { addSuffix: suffix })
  }

  ngOnInit() {
  }

}
