import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { Book } from "../models/book.model";
import { BookResponse } from "../models/bookResponse.model";

const URL: string = 'http://skunkworks.ignitesol.com:8000/books?mime_type=image';
const TOPIC: string = '&topic=';
const SEARCH: string = '&search='

@Injectable()
export class HttpService {

    nextResults: string;
    constructor(private http: HttpClient) { }

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
}