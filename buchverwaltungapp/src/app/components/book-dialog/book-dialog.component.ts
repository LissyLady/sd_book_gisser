import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-book-dialog',
  templateUrl: './book-dialog.component.html',
})
export class AddBookDialogComponent {
  newBook: any = {
    title: '',
    isbn: '',
    pageCount: 0,
    summary: '',
  };

  constructor(
    public dialogRef: MatDialogRef<AddBookDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}