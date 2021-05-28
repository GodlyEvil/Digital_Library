import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  genres: string[];

  ngOnInit() {
    this.genres = ["fiction", "drama", "humour", "politics", "philosophy", "history", "adventure"]
  }
}
