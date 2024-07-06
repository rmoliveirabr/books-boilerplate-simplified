'use server';

import { SearchParams } from '@/actions/search'
import { BookUseCases } from '@/actions/book/book-use-cases';
import { BookPresenter } from '@/backend/infra/http/presenters/book-presenter';
import { BookRequest } from '@/actions/book/book-request'

export async function getAllBooks({ page, pageSize, query }: SearchParams): Promise<{ books: BookRequest[], totalCount: number }> {
  // const params = new URLSearchParams({
  //   page,
  //   pageSize,
  //   query: query || ''
  // })

  // try {
  //   const httpAdapter = new FetchAdapter()
  //   console.log(`/books?${params.toString()}`)
  //   const response = await httpAdapter.get(`/books?${params.toString()}`, {
  //     cache: 'no-cache'
  //   })
  //   const data = await response.json()
  //   return data
  // } catch (error) {
  //   return []
  // }

  const response = await BookUseCases.getInstance().getAllBooksUseCase.execute({
      pagination: {
        page: parseInt(page),
        pageSize: parseInt(pageSize),
        filters: { query },
        // sorting: { asc: asc ? true : desc ? true : false, column: asc },
      },
  });

  const bookList = response.getResponse()?.books.map((book) => BookPresenter.toHttpResponse(book)) || [];
  const totalCount = response.getResponse()?.totalCount || 0;

  return {
      books: bookList,
      totalCount,
  };

}