import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-genre-card',
  templateUrl: './genre-card.component.html',
  styleUrls: ['./genre-card.component.css']
})
export class GenreCardComponent implements OnInit {

  private commonIconPath: string = '../../../assets/icons/';

  @Input() genreName: string;
  genreIcon: string;


  constructor() { }

  ngOnInit(): void {
    this.genreIcon = this.commonIconPath + this.genreName + '.svg'
  }
}
