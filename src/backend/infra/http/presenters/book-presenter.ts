import { BookRequest } from '@/actions/book/book-request';
import { Book } from '@/backend/domain/book/entities/book';
import { dateToString } from '@/lib/utils';

export class BookPresenter {
    static toHttpResponse(book:Book): BookRequest {
        return {
          id: book.id.toString(),
          title: book.title,
          author: book.author,
          summary: book.summary,
          publisher: book.publisher,
          publicationDate: dateToString(book.publicationDate),
          creatorId: book.creatorId.toString(),
        };
    }
}