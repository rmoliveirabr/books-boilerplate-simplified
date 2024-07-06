'use server';

import { BookUseCases } from '@/actions/book/book-use-cases';
import { UnexpectedError } from '@/backend/core/errors/unexpected-error';
import { BookPresenter } from '@/backend/infra/http/presenters/book-presenter';

export async function getBook(id: string) {
  // try {
  //   const httpAdapter = new FetchAdapter()
  //   const response = await httpAdapter.get(`/books/${id}`, {
  //     cache: 'no-cache'
  //   })
  //   const data = await response.json()
  //   return data
  // } catch (error) {
  //   if (error instanceof Error) {
  //     throw new Error(error.message)
  //   }
  // }  
  const response = await BookUseCases.getInstance().getBookUseCase.execute(id);
  const responseValue = response.getResponse();

  if (response.isError() || !responseValue) throw new UnexpectedError(response.getError()?.message);
  else return { book: BookPresenter.toHttpResponse(responseValue.book) };

}