'use server';

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation';

import { auth } from '@/auth';

import { BookUseCases } from '@/actions/book/book-use-cases';
import { BookRequest } from '@/actions/book/book-request'
import { NotAllowed } from '@/backend/domain/customer/usecases/errors/not-allowed';
import { UnexpectedError } from '@/backend/core/errors/unexpected-error';
import { stringToDate } from '@/lib/utils';

export async function createBook(body: BookRequest) {
  // try {
  //   const httpAdapter = new FetchAdapter()
  //   const response = await httpAdapter.post('/books', body)

  //   if (!response.ok) {
  //     const data = await response.json()
  //     throw new Error(data.message)
  //   }
  // } catch (error) {
  //   console.log('Error action:');
  //   if (error instanceof Error) {
  //     throw new Error(error.message)
  //   }
  // }

  // set the creatorId to the logged user id
  const session = await auth(); 
  if (!session) throw new NotAllowed();

  const { id: userId } = session;

  // create the book
  const {
      title,
      author,
      summary = '',
      publisher = '',
      publicationDate,
  } = body;
  
  const response = await BookUseCases.getInstance().createBookUseCase.execute({
      title,
      author,
      summary,
      publisher,
      publicationDate: stringToDate(publicationDate),
      creatorId: userId,
  });
  const responseValue = response.getResponse();

  if (response.isError() || !responseValue) throw new UnexpectedError(response.getError()?.message);
  // else return { message: 'Book updated successfully', book: BookPresenter.toHttpResponse(responseValue.book) }; // TODO: locale
  
  revalidatePath('/books');
  redirect('/books');
}
