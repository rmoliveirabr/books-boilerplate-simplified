'use client'

import { Button, Dialog, DialogContent, DialogTitle } from '@mui/material';

import BookList from '@/components/books/book-list';
import BookForm from '@/components/books/book-form';

import { useSessionData } from '@/hooks/use-session-data';
import { useBookContext } from '@/contexts/book-context';

export const BookPage: React.FC = () => { 
  // const [open, setOpen] = useState(false);
  // const [refreshProp, setRefreshProp] = useState(refresh || false);
  // const [idForEdit, setIdForEdit] = useState('');

  // console.log('BookPage.tsx: refresh', refresh);
  // console.log('BookPage.tsx: refreshProp', refreshProp);

  // const handleAdd = () => {
  //   setOpen(true);
  //   setIdForEdit('');
  // };

  // const handleEdit = (id:string) => {
  //   setOpen(true);
  //   setIdForEdit(id);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  // const handleSuccess = () => {
  //   setOpen(false);
  //   // setRefresh(prev => !prev); // Toggle refresh to reload the list
  // };

  const { status } = useSessionData();
  const { handleAdd, open, handleClose } = useBookContext();

  return (
    <div>
      <h1>Books</h1>
      {status === 'authenticated' ? (
      <Button variant="outlined" color="primary" onClick={handleAdd}>
        Add New Book
      </Button>) : null}
      <br /><br />
      {/* <BookList refresh={refreshProp} setRefresh={setRefreshProp} handleEdit={handleEdit} /> */}
      <BookList />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Book Data</DialogTitle>
        <DialogContent>
          <BookForm />
          {/* <BookForm onSuccess={handleSuccess} handleClose={handleClose} bookId={idForEdit} /> */}
        </DialogContent>
      </Dialog>
    </div>
  );
};

