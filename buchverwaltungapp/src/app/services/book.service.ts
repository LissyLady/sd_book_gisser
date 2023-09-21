import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class BookService {
    private apiUrl = 'http://localhost:3000/api/books';

    constructor(private http: HttpClient) {}

    // Create a new book
    createBook(book: any): Observable<any> {
        return this.http.post(this.apiUrl, book);
    }

    // Get all books
    getBooks(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl);
    }

    // Get a book by ID
    getBookById(id: string): Observable<any> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.get<any>(url);
    }

    // Update a book by ID
    updateBook(id: string, updatedBook: any): Observable<any> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.put(url, updatedBook);
    }

    // Delete a book by ID
    deleteBook(id: string): Observable<any> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.delete(url);
    }
}
