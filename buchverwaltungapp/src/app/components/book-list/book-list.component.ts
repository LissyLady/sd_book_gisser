import { Component, OnInit } from '@angular/core';
import { AddBookDialogComponent } from '../book-dialog/book-dialog.component';
import { BookService } from 'src/app/services/book.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-book-list',
    templateUrl: './book-list.component.html',
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
        const dialogRef = this.dialog.open(AddBookDialogComponent, {
            width: '400px',
            data: { ...book },
        });
    
        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.bookService.updateBook(book.isbn, result).subscribe(() => {
                    this.getBooks();
                });
            }
        });
    }

    deleteBook(book: any): void {
        const confirmDelete = window.confirm(`Are you sure you want to delete ${book.title}?`);
        
        if (confirmDelete) {
            if (book.isbn) {
                this.bookService.deleteBook(book.isbn).subscribe(() => {
                    this.getBooks();
                });
            } else {
                console.error('Invalid ISBN for deleting the book.');
            }
        }
    }
}