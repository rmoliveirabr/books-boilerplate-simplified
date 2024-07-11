'use client'

import { TextField, Button, Grid } from '@mui/material';

import { useBookForm } from '@/hooks/use-book-form'
import { useBookContext } from '@/contexts/book-context';
import { GenericButton } from '@/components/ui/generic-button';

// interface BookFormProps {
//   // book?: BookRequest;
//   // onSuccess: () => void;
//   handleClose: () => void;
//   bookId?: string;
// }

// const BookForm: React.FC<BookFormProps> = ({ book, onSuccess, handleClose, bookId }) => {
const BookForm: React.FC = () => {

  // const {formData, handleSubmit, handleChange} = useBookForm({bookId, onSuccess});
  const { handleBookSubmission, handleSubmit, register, errors } = useBookForm();
  const { bookId, handleClose } = useBookContext();

  return (
    <form onSubmit={handleSubmit(handleBookSubmission)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            {...register('title', { required: true })}
            label="Title"
            name="title"
            placeholder="Title"
            error={!!errors.title}
            helperText={errors.title?.message}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            {...register('author', { required: true })}
            label="Author"
            name="author"
            placeholder="Author"
            error={!!errors.author}
            helperText={errors.author?.message}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            {...register('summary', { required: false })}
            label="Summary"
            name="summary"
            placeholder="Summary"
            error={!!errors.summary}
            helperText={errors.summary?.message}
            multiline
            rows={4}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            {...register('publisher', { required: false })}
            label="Publisher"
            name="publisher"
            placeholder="Publisher"
            error={!!errors.publisher}
            helperText={errors.publisher?.message}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            {...register('publicationDate', { required: true })}
            label="Publication Date"
            type="date"
            name="publicationDate"
            placeholder="Publication Date"
            error={!!errors.publicationDate}
            helperText={errors.publicationDate?.message}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={6}>
          <GenericButton type={'submit'} label={bookId ? 'Update' : 'Create'} />
        </Grid>
        <Grid item xs={6}>
          <GenericButton label={'Cancel'} onClick={handleClose} />
        </Grid>
      </Grid>
    </form>
  );
};

export default BookForm;
