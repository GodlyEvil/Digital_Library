import { Book } from "./book.model";

export class BookResponse {
    books: Book[];
    nextPageUrl: string;
    numberOfBooks: number;
    constructor(books: Book[], next: string, count: number) {
        this.books = books;
        this.nextPageUrl = next;
        this.numberOfBooks = count;
    }
}