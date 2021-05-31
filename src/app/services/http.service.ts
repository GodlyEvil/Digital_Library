import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { Book } from "../models/book.model";
import { BookResponse } from "../models/bookResponse.model";

const URL: string = 'http://skunkworks.ignitesol.com:8000/books?mime_type=image';
const TOPIC: string = '&topic=';
const SEARCH: string = '&search='

@Injectable()
export class HttpService {

    constructor(private http: HttpClient, private router: Router) { }

    public getBooks(genre: string, search: string): Observable<BookResponse> {
        let url: string = URL + TOPIC + genre;
        if (search) url += SEARCH + search.replace(' ', '%20')
        return this.http.get(url)
            .pipe(
                map((books: any) => {
                    return new BookResponse(
                        books.results.map((ele: any) => { return new Book(ele.title, ele.authors[0]?.name, ele.formats); }),
                        books.next,
                        books.count
                    )
                }));
    }

    public login(username: string, password: string): Observable<any> {
        return new Observable((subscriber)=> {
            setTimeout(() => {
                if(username === 'test' && password == '01Jan@21') {
                    sessionStorage.setItem('uname', username);
                    sessionStorage.setItem('pass', password);
                    subscriber.next(true)
                } else {
                    subscriber.error('Invalid');
                }
                subscriber.complete();
            }, 2000);
        });
    }

    public isValidUser(): Observable<boolean> | boolean{
        return new Observable(subscriber => {
            setTimeout(() => {
                if(sessionStorage.getItem('uname') === 'test' && sessionStorage.getItem('pass') === '01Jan@21') {
                    subscriber.next(true);
                  } else {
                    this.router.navigate(['/login']);
                    subscriber.next(false);
                  }
                  subscriber.complete();
            }, 1500);
        });
    }
}