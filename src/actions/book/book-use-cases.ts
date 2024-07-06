import { BookRepository } from '@/backend/domain/book/repositories/book-repository';
import { PrismaBookRepository } from '@/backend/infra/database/prisma/repositories/prisma-book-repository';

import { CreateBook } from '@/backend/domain/book/usecases/create-book';
import { GetAllBooks } from '@/backend/domain/book/usecases/get-all-books';
import { GetBook } from '@/backend/domain/book/usecases/get-book';
import { UpdateBook } from '@/backend/domain/book/usecases/update-book';
import { DeleteBook } from '@/backend/domain/book/usecases/delete-book';

export class BookUseCases {
  private static instance: BookUseCases;
  private bookRepository: BookRepository;

  public createBookUseCase: CreateBook;
  public getAllBooksUseCase: GetAllBooks;
  public getBookUseCase: GetBook;
  public updateBookUseCase: UpdateBook;
  public deleteBookUseCase: DeleteBook;

  private constructor() {
    this.bookRepository = new PrismaBookRepository();
    this.createBookUseCase = new CreateBook(this.bookRepository);
    this.getAllBooksUseCase = new GetAllBooks(this.bookRepository);
    this.getBookUseCase = new GetBook(this.bookRepository);
    this.updateBookUseCase = new UpdateBook(this.bookRepository);
    this.deleteBookUseCase = new DeleteBook(this.bookRepository);
  }

  // singleton
  public static getInstance(): BookUseCases {
    if (!BookUseCases.instance) {
      BookUseCases.instance = new BookUseCases();
    }
    return BookUseCases.instance;
  }
}