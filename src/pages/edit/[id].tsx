import { AppDispatch } from '@/store';
import { fetchBookById } from '@/store/book';
import { BookType } from '@/types/bookTypes';
import { FormEditBook } from '@/views/pages/FormEditBook';
import { Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

const EditPage = () => {

  const [book, setBook] = useState<BookType>()
  const [bookLoading, setBookLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)

  const router = useRouter();
  const bookId = router.query.id;
  const dispatch = useDispatch<AppDispatch>()


  useEffect(() => {
    if (!bookId) return
    setBookLoading(true)
    dispatch(fetchBookById(+bookId!))
      .then((res) => {
        setBook(res.payload)
      })
      .catch((err) => {
        console.log(err)
        setError(err)
      })
      .finally(() => {
        setBookLoading(false)
      })

  }, [bookId])


  return (
    <Grid
      justifyContent='center'
      container
      p={4}
    >
      <Grid item xs={12}>
        <Typography
          component='h1'
          variant='h2'
          textAlign='center'
        >
          Editar Libro
        </Typography>
      </Grid>
      <Grid item xs={12}>
        {
          bookLoading && <Typography variant="h6" align="center">Cargando...</Typography>
        }
        {
          error && <Typography variant="h6" align="center">Hubo un error</Typography>
        }
      </Grid>
      <Grid item xs={12}>
        {
          book && <FormEditBook book={book} />
        }
      </Grid>
    </Grid>
  )
}

export default EditPage
