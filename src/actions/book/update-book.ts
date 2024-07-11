'use server';

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation';

import { BookRequest } from '@/actions/book/book-request'
import { BookUseCases } from '@/actions/book/book-use-cases';
import { UnexpectedError } from '@/backend/core/errors/unexpected-error';
import { BookPresenter } from '@/backend/infra/http/presenters/book-presenter';
import { stringToDate } from '@/lib/utils';

export async function updateBook(body: BookRequest) {
  // try {
  //   const httpAdapter = new FetchAdapter()
  //   const response = await httpAdapter.put(`/books/${body.id}`, body)

  //   if (!response.ok) {
  //     const data = await response.json()
  //     console.log(data)
  //     throw new Error(data.message)
  //   }
  // } catch (error) {
  //   if (error instanceof Error) {
  //     throw new Error(error.message)
  //   }
  // }
  const {
    title,
    author,
    summary = '',
    publisher = '',
    publicationDate,
    creatorId,
  } = body;

  if (!body.id) throw new UnexpectedError('Book id is required'); // TODO: locale

  const response = await BookUseCases.getInstance().updateBookUseCase.execute(body.id, {
      title,
      author,
      summary,
      publisher,
      publicationDate: stringToDate(publicationDate),
      creatorId: creatorId || '', // it's acceptable not to pass the creatorId because it will not use it (it will keep the creator from the existing book)
  });
  const responseValue = response.getResponse();

  if (response.isError() || !responseValue) throw new UnexpectedError(response.getError()?.message);
  // else return { message: 'Book updated successfully', book: BookPresenter.toHttpResponse(responseValue.book) }; // TODO: locale

  revalidatePath('/books');
  redirect('/books');
}
