import { Component, OnInit } from '@angular/core';
import { AddBookDialogComponent } from '../book-dialog/book-dialog.component';
import { BookService } from 'src/app/services/book.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-book-list',
    templateUrl: './book-list.component.html',
    styleUrls: ['./book-list.component.css'],
})
export class BookListComponent implements OnInit {
    books: any[] = [];
    searchText = '';
    selectedFilter = 'all';

    constructor(private bookService: BookService, private dialog: MatDialog) { }

    ngOnInit(): void {
        this.getBooks();
    }

    getBooks(): void {
        this.bookService.getBooks().subscribe((books) => {
            this.books = books;
        });
    }

    openAddBookDialog(): void {
        const dialogRef = this.dialog.open(AddBookDialogComponent, {
            width: '400px',
            data: {},
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.bookService.createBook(result).subscribe(() => {
                    this.getBooks();
                });
            }
        });
    }

    editBook(book: any): void {
        // Implementieren Sie die Bearbeiten-Funktion hier
    }

    deleteBook(book: any): void {
        // Implementieren Sie die Löschen-Funktion hier
    }

    filterBooks(): any[] {
        if (this.selectedFilter === 'all') {
            return this.books.filter((book) =>
                book.title.toLowerCase().includes(this.searchText.toLowerCase())
            );
        } else if (this.selectedFilter === 'title') {
            return this.books.filter((book) =>
                book.title.toLowerCase().includes(this.searchText.toLowerCase())
            );
        } else if (this.selectedFilter === 'isbn') {
            return this.books.filter((book) =>
                book.isbn.toLowerCase().includes(this.searchText.toLowerCase())
            );
        } else {
            return this.books;
        }
    }
}