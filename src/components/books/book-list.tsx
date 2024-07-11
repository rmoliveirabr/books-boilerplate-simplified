'use client'

import { DataGrid, DataGridProps, GridCellParams, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { TextField, Button, Grid } from '@mui/material';

import { useBookList } from '@/hooks/use-book-list'
import React from 'react';
import { Book } from '@/@types/book';

// type Props = {
//   refresh: boolean;
//   setRefresh: (refresh: boolean) => void;
//   handleEdit: (id: string) => void;
// }

// const BookList = ({ refresh, setRefresh, handleEdit }: Props) => {
// const BookList = ({ handleEdit }: Props) => {
const BookList = () => {
  // console.log('BookList.tsx: refresh', refresh);

  const {books, columns, paginationModel, setPaginationModel, rowCount, query, setQuery} = 
    // useBookList({refresh, setRefresh, handleEdit});
    // useBookList({handleEdit});
    useBookList();

  // Some API clients return undefined while loading
  // Following lines are here to prevent `rowCount` from being undefined during the loading
  // const rowCountRef = React.useRef(rowCount || 0);
  // const rowCountMemo = React.useMemo(() => {
  //   if (rowCount !== undefined) {
  //     rowCountRef.current = rowCount;
  //   }
  //   return rowCountRef.current;
  // }, [rowCount]);
  
  return (
    <div style={{ width: '100%' }}>
      <hr/>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            fullWidth
          />
        </Grid>
      </Grid>
      {books.length > 0 ? (
        <DataGrid
          rows={books}
          columns={columns}
          pagination
          rowCount={rowCount}
          pageSizeOptions={[5, 10, 20]} 
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          paginationMode='server'
          // sortingMode='server'
          autoHeight
          className='noOutlineOnFocus'
        />)
        : null}
    </div>
  );
};

export default BookList;
