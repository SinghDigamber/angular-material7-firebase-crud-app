export interface Book {
   $key: string;
   book_name: string;
   isbn_10: number;
   author_name: string
   publication_date: Date;
   binding_type: string;
   in_stock: string;
   languages: Array<string>;
}
