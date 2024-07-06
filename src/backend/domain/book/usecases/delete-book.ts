import { Book } from '@/backend/domain/book/entities/book';
import { BookRepository } from '@/backend/domain/book/repositories/book-repository';
import { UseCaseResponse, Error, Response } from '@/backend/core/use-case-response';
import { ResourceNotFound } from '@/backend/core/errors/resource-not-found';

type BookResponse = UseCaseResponse<
    ResourceNotFound,
    {
        book: Book
    }
>;

export class DeleteBook {
    constructor(private bookRepository: BookRepository) {}
  
    async execute(id: string): Promise<BookResponse> {
        // check for existing book
        const existingBook = await this.bookRepository.findById(id);
        if (!existingBook)
            return new Error(new ResourceNotFound('book'));
        
        const deletedBook = await this.bookRepository.delete(id);
        if (!deletedBook) return new Error(new ResourceNotFound('book'));
        else return new Response({ book:deletedBook });
    }
}
  