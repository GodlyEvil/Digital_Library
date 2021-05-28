import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  genres: string[];

  ngOnInit() {
    this.genres = ["fiction", "drama", "humour", "politics", "philosophy", "history", "adventure"]
  }

}
