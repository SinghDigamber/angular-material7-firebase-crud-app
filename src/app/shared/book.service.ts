import { Injectable } from '@angular/core';
import { Book } from './book';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})

export class BookService {
  booksRef: AngularFireList<any>;
  bookRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) {}

  /* Create book */
  AddBook(book: Book) {
    this.booksRef.push({
      book_name: book.book_name,
      isbn_10: book.isbn_10,
      author_name: book.author_name,
      publication_date: book.publication_date,
      binding_type: book.binding_type,
      in_stock: book.in_stock,
      languages: book.languages
    })
    .catch(error => {
      this.errorMgmt(error);
    })
  }

  /* Get book */
  GetBook(id: string) {
    this.bookRef = this.db.object('books-list/' + id);
    return this.bookRef;
  }  

  /* Get book list */
  GetBookList() {
    this.booksRef = this.db.list('books-list');
    return this.booksRef;
  }

  /* Update book */
  UpdateBook(id, book: Book) {
    this.bookRef.update({
      book_name: book.book_name,
      isbn_10: book.isbn_10,
      author_name: book.author_name,
      publication_date: book.publication_date,
      binding_type: book.binding_type,
      in_stock: book.in_stock,
      languages: book.languages
    })
    .catch(error => {
      this.errorMgmt(error);
    })
  }

  /* Delete book */
  DeleteBook(id: string) {
    this.bookRef = this.db.object('books-list/' + id);
    this.bookRef.remove()
    .catch(error => {
      this.errorMgmt(error);
    })
  }

  // Error management
  private errorMgmt(error) {
    console.log(error)
  }
}