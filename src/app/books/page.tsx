'use client'

import { BookPage } from '@/components/books/book-page';
import { BookContextProvider } from '@/contexts/book-context';

const BooksMainPage: React.FC = () => {
  return (
    <BookContextProvider>
      <BookPage />
    </BookContextProvider>
  );
};

export default BooksMainPage;
