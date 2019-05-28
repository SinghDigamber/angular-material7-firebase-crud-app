import { Book } from './../../shared/book';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { BookService } from './../../shared/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})

export class BookListComponent {
  
  dataSource: MatTableDataSource<Book>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  BookData: any = [];
  displayedColumns: any[] = [
    '$key',
    'book_name',
    'author_name', 
    'publication_date',
    'in_stock',
    'action'
  ];
  
  constructor(private bookApi: BookService){
    this.bookApi.GetBookList()
    .snapshotChanges().subscribe(books => {
        books.forEach(item => {
          let a = item.payload.toJSON();
          a['$key'] = item.key;
          this.BookData.push(a as Book)
        })
        /* Data table */
        this.dataSource = new MatTableDataSource(this.BookData);
        /* Pagination */
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
        }, 0);
    })
  }

  /* Delete */
  deleteBook(index: number, e){
    if(window.confirm('Are you sure?')) {
      const data = this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
      this.dataSource.data = data;
      this.bookApi.DeleteBook(e.$key)
    }
  }
  
}