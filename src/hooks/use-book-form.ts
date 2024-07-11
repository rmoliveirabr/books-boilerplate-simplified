'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form'

import { showToast } from '@/components/toast';

import { BookRequest } from '@/actions/book/book-request'
import { getBook } from '@/actions/book/get-book'
import { createBook } from '@/actions/book/create-book'
import { updateBook } from '@/actions/book/update-book'

import { dateToString } from '@/lib/utils'
import { useBookContext } from '@/contexts/book-context';

export const BookForm = z.object({
  id: z.string().optional(),
  title: z.string({ required_error:'Título obrigatório' }), // i18n.t('forms:required') }),
  author: z.string({ required_error:'Autor obrigatório' }), // i18n.t('forms:required') }),
  summary: z.string().optional(),
  publisher: z.string().optional(),
  publicationDate: z.string({ required_error:'Data de publicação é obrigatória' }), // i18n.t('forms:required') }),
});

export type BookFormSchema = z.infer<typeof BookForm>

// type Props = {
//   bookId?: string;
//   handleClose: () => void;
// }

export const useBookForm = () => {
// export const useBookForm = ({bookId, handleClose}: Props) => {
  // console.log('useBookForm', bookId);
  const { setRefresh, bookId, handleClose } = useBookContext();

  const router = useRouter()
  const [ id, setId ] = useState<string>(bookId || '');

  async function handleBookSubmission(data: BookFormSchema) {
    // console.log('handleBookSubmission', data);

    // save data
    try {
      if (id) {
        data.id = id;
        await updateBook(data);
        showToast('Book updated successfully', 'success');
      } else {
        await createBook(data);
        showToast('Book created successfully', 'success');
      }
      if (handleClose) handleClose();
      setRefresh(true);
      router.push('/books');
    } catch (error) {
      showToast('An error occurred while saving the book', 'error');
    }
  };

  let defaultData: BookRequest = {
    title: '',
    author: '',
    summary: '',
    publisher: '',
    publicationDate: dateToString(new Date()),
  };

  const { formState, register, handleSubmit, formState: { errors }, setValue  } = useForm<BookFormSchema>({
    resolver: zodResolver(BookForm),
    defaultValues: defaultData,
  })

  useEffect(() => {
    // console.log('bookId', bookId)
    const fetchBook = async (idParam) => {
      try {
        const response = await getBook(idParam);
        // console.log('response:', response)
        // setFormData({...response.book, publicationDate: dateToString(new Date(response.book.publicationDate))});
        return response.book;
      } catch (error) {
        showToast('An error occurred while fetching the book', 'error');
      }
    }

    if (id) fetchBook(id)
      .then((data) => {
        setValue('title', data?.title || '');
        setValue('author', data?.author || '');
        setValue('summary', data?.summary || '');
        setValue('publisher', data?.publisher || '');
        setValue('publicationDate', data?.publicationDate || '');
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        // Handle error gracefully
      });
  }, [setValue, id]);

  return { handleBookSubmission, handleSubmit, formState, register, errors }
}