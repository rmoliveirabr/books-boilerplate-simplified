'use server';

import { revalidatePath } from 'next/cache';

import { BookUseCases } from '@/actions/book/book-use-cases';
import { UnexpectedError } from '@/backend/core/errors/unexpected-error';
import { redirect } from 'next/navigation';

export async function deleteBook(id: string) {
  // try {
  //   const httpAdapter = new FetchAdapter()
  //   const response = await httpAdapter.delete(`/books/${id}`, {
  //     cache: 'no-cache'
  //   })
  //   if (!response.ok) {
  //     const data = await response.json()
  //     throw new Error(data.message)
  //   }
  // } catch (error) {
  //   if (error instanceof Error) {
  //     throw new Error(error.message)
  //   }
  // }    
  
  const response = await BookUseCases.getInstance().deleteBookUseCase.execute(id);
  const responseValue = response.getResponse();

  if (response.isError() || !responseValue) throw new UnexpectedError(response.getError()?.message);
  // else return { message: 'Book deleted successfully', book: BookPresenter.toHttpResponse(responseValue.book) }; // TODO: locale

  revalidatePath('/books');
  redirect('/books');
}