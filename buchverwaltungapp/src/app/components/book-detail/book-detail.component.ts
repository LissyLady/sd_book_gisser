import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/services/book.service';

@Component({
    selector: 'app-book-detail',
    templateUrl: './book-detail.component.html',
})
export class BookDetailComponent implements OnInit {
    book: any;

    constructor(
        private route: ActivatedRoute,
        private bookService: BookService
    ) { }

    ngOnInit() {
        this.route.paramMap.subscribe((params) => {
            const bookId = params.get('id');
            if (bookId !== null) {

                this.bookService.getBookById(bookId).subscribe((data) => {
                    this.book = data;
                });
            }
        });
    }
}
