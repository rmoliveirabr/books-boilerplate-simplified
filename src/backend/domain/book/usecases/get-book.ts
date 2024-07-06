import { BookRepository } from '@/backend/domain/book/repositories/book-repository';
import { Book } from '@/backend/domain/book/entities/book';
import { ResourceNotFound } from '@/backend/core/errors/resource-not-found'
import { UseCaseResponse, Error, Response } from '@/backend/core/use-case-response';

type BookResponse = UseCaseResponse<
    ResourceNotFound,
    {
        book: Book;
    }
>;

export class GetBook {
    constructor(private bookRepository: BookRepository) {}
  
    async execute(id: string): Promise<BookResponse> {
        var book = await this.bookRepository.findById(id);
        if (book) return new Response({ book:book });
        else return new Error(new ResourceNotFound('book'));
    }
}
  