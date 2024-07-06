import { BookRepository } from '@/backend/domain/book/repositories/book-repository';
import { Book } from '@/backend/domain/book/entities/book';
import { UseCaseResponse, Response } from '@/backend/core/use-case-response';
import { Pagination } from '@/backend/core/pagination';

type BookRequest = {
    pagination: Pagination;
};

type BookResponse = UseCaseResponse<
    null,
    {
      books: Book[];
      totalCount: number;
    }
>;

export class GetAllBooks {
    constructor(private bookRepository: BookRepository) {}
  
    async execute({pagination}: BookRequest): Promise<BookResponse> {  
        var response = await this.bookRepository.getAll(pagination);
        
        return new Response(response);
    }
}
  