import { HttpErrorResponse } from '@angular/common/http';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Book } from 'src/app/models/book.model';
import { BookResponse } from 'src/app/models/bookResponse.model';
import { HttpService } from 'src/app/services/http.service';


@Component({
  selector: 'app-genre-page',
  templateUrl: './genre-page.component.html',
  styleUrls: ['./genre-page.component.css']
})
export class GenrePageComponent implements OnInit, OnDestroy {

  triggerCall: Boolean = true;
  genre: string;
  searchText: string;
  results: Book[] = [];
  searchResults: Book[] = [];
  nextResults: string = '';
  nextSearchResults: string = '';
  totalCount: number = 0;
  searchCount: number = 0;
  searchBoxPlaceholder: string = '';
  isLoading: Boolean = false;
  mySubs: Subscription[] = [];

  constructor(private route: ActivatedRoute, private httpSrv: HttpService) { }

  ngOnInit(): void {
    this.genre = this.route.snapshot.params['genre'];
    this.searchText = '';
    this.toggleLoading();
    this.getBooks();
  }

  ngOnDestroy(): void {
    for (const sub of this.mySubs) {
      if (!sub.closed) {
        sub.unsubscribe();
      }
    }
  }

  toggleLoading() { this.isLoading = !this.isLoading };

  getBooks() {
    this.mySubs.push(this.httpSrv.getBooks(this.genre, undefined).subscribe((books: BookResponse) => {
      this.results = new Array(...books.books);
      this.searchResults.push(...this.results);
      this.nextResults = books.nextPageUrl;
      this.totalCount = books.numberOfBooks;
      this.searchBoxPlaceholder = 'Search within ' + this.totalCount + ' books';
      this.toggleLoading();
    }, (error: HttpErrorResponse) => {
      alert(error.status + ":" + error.statusText)
    }));
  }

  getMoreBooks() {
    this.mySubs.push(this.httpSrv.getBooks(this.nextResults, undefined).subscribe((books: BookResponse) => {
      let newResults: Book[] = books.books;
      this.results.push(...newResults);
      this.searchResults.push(...newResults)
      this.nextResults = books.nextPageUrl;
      this.toggleLoading();
      this.triggerCall = true;
    }, (error: HttpErrorResponse) => {
      alert(error.status + ":" + error.statusText)
    }));
  }

  getMoreSearchBooks() {
    this.mySubs.push(this.httpSrv.getBooks(this.nextSearchResults, undefined).subscribe((books: BookResponse) => {
      let newResults: Book[] = books.books;
      this.searchResults.push(...newResults)
      this.nextSearchResults = books.nextPageUrl;
      this.toggleLoading();
      this.triggerCall = true;
    }, (error: HttpErrorResponse) => {
      alert(error.status + ":" + error.statusText)
    }));
  }

  @HostListener('window:scroll', ['$event']) onScroll(event: any) {
    if (((this.searchCount === 0 && this.results.length < this.totalCount) || (this.searchCount !== 0 && this.searchCount > this.searchResults.length)) && this.triggerCall &&
      (event.target.scrollingElement.scrollTop + window.outerHeight >= event.target.scrollingElement.scrollHeight)) {
      this.triggerCall = false;
      this.toggleLoading();
      if (this.searchCount !== 0 && this.searchCount > this.searchResults.length) {
        this.getMoreSearchBooks();
      }
      else if (this.searchCount === 0 && this.results.length < this.totalCount) {
        this.getMoreBooks();
      }
    }
  }

  search(event) {
    if (!event) {
      this.searchCount = 0;
      this.nextSearchResults = '';
      this.searchResults = new Array(...this.results);
    } else {
      if (event.key !== "Enter" && event.key !== " ") {
        if (this.searchText.trim() !== '') {
          let keyWords: string[] = this.searchText.toLowerCase().split(' ');
          let tempResults: Book[] = []
          for (const keyWord of keyWords) {
            if (tempResults.length > 0) {
              tempResults = tempResults.filter((book: Book) => {
                if ((book.author.toLowerCase().indexOf(keyWord) > -1) || (book.title.toLowerCase().indexOf(keyWord) > -1)) {
                  return book;
                }
              })
            } else {
              tempResults = this.results.filter((book: Book) => {
                if ((book.author.toLowerCase().indexOf(keyWord) > -1) || (book.title.toLowerCase().indexOf(keyWord) > -1)) {
                  return book;
                }
              })
            }
          }
          this.searchResults = new Array(...tempResults);
        } else {
          this.searchResults = new Array(...this.results);
        }
      } else if (event.key === "Enter" && this.results.length !== this.totalCount) {
        this.toggleLoading();
        let searchStr: string = this.searchText;
        this.mySubs.push(this.httpSrv.getBooks(this.genre, searchStr)
          .subscribe((books: BookResponse) => {
            this.searchResults = new Array(...(books.books));
            this.nextSearchResults = books.nextPageUrl;
            this.searchCount = books.numberOfBooks;
            this.toggleLoading();
          }, (error: HttpErrorResponse) => {
            alert(error.status + ":" + error.statusText)
          }));
      }
    }
  }

  clearSearchText() {
    this.searchText = '';
    this.search(undefined);
  }

}
