import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  counter:number;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.counter = 5
    let myIntv = setInterval(() => {
      if(this.counter === 0) {
        clearInterval(myIntv);
        this.router.navigate(["/home"]);
      }
      --this.counter
    }, 1000);
  }

}
