import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css']
})
export class BookCardComponent implements OnInit {

  @Input() title: string;
  @Input() imagePath: string;
  @Input() author: string;
  @Input() link: string;

  constructor() { }

  ngOnInit(): void {
  }

  open() {
    if(this.link !== '#') {
      window.open(this.link, '_blank', "noopener,noreferrer");
    } else {
      alert("No viewable version available.");
    }
  }

}
