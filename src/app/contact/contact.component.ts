import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  public contact = {
    name: "",
    text: "",
    email: ""
  }
  constructor() { }

  handleSubmit() {
    this.contact.email = ""
    this.contact.name = ""
    this.contact.text = ""
  }

  ngOnInit() {
  }

}
