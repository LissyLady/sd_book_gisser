// book-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
})
export class BookFormComponent implements OnInit {
  bookForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService,
    private router: Router
  ) {}

  ngOnInit() {
    this.bookForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      description: [''],
    });
  }

  onSubmit() {
    if (this.bookForm.valid) {
      this.bookService.createBook(this.bookForm.value).subscribe(() => {
        this.router.navigate(['/books']);
      });
    }
  }
}
