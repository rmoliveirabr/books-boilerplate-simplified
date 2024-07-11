import React, { createContext, Dispatch, SetStateAction, useContext, useState } from 'react'

type BookContextProps = {
  refresh: boolean,
  setRefresh: Dispatch<SetStateAction<boolean>>,
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>,
  bookId: string,
  setBookId: Dispatch<SetStateAction<string>>,
  handleAdd: () => void,
  handleEdit: (id: string) => void,
  handleClose: () => void,
};

const defaultValues: BookContextProps  = {
  refresh: false,
  setRefresh: () => {},
  open: false,
  setOpen: () => {},
  bookId: '',
  setBookId: () => {},
  // Functions to be shared (replace placeholders with actual implementations)
  handleAdd: () => { console.log('Placeholder: handleAdd implementation'); },
  handleEdit: (id: string) => { console.log('Placeholder: handleEdit implementation', id); },
  handleClose: () => { console.log('Placeholder: handleClose implementation'); },
}

export const BookContext = createContext<BookContextProps>(defaultValues);

export const useBookContext = () => {
  const bookListContext = useContext(BookContext)
  if (bookListContext === undefined) {
    throw new Error('useBookContext must be inside a BookContextProvider')
  }

  return bookListContext
}

export const BookContextProvider = ({ children }: any) => {
  const [refresh, setRefresh] = useState(false);
  const [open, setOpen] = useState(false);
  const [bookId, setBookId] = useState('');

  // Functions to be shared (actual implementations)
  const handleAdd = () => {
    setOpen(true);
    setBookId('');
  };

  const handleEdit = (id:string) => {
    setOpen(true);
    setBookId(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Provide all context values, including functions
  const value = {
    refresh,
    setRefresh,
    open,
    setOpen,
    bookId,
    setBookId,
    handleAdd, 
    handleEdit,
    handleClose,
  };
  
  return (
    <BookContext.Provider value={value}>
      {children}
    </BookContext.Provider>
  )
}
