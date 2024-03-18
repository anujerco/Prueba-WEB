import { BookType } from "@/types/bookTypes";
import { Controller, useForm } from "react-hook-form";
import * as yup from 'yup'
import { Button, FormControl, FormHelperText, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { useRouter } from "next/router";
import { yupResolver } from '@hookform/resolvers/yup'
import { addNewBook } from "@/store/book";
import { useSnackbar } from 'notistack'




interface defaultValuesInterface {
  title: string,
  author: string,
  description: string,
}


const schema = yup.object().shape({
  title: yup.string().required('Este campo es requerido'),
  author: yup.string().required('Este campo es requerido'),
  description: yup.string().required('Este campo es requerido'),
})


const defaultValues: defaultValuesInterface = {
  title: '',
  author: '',
  description: '',
}


const CreatePage = () => {

  const [error, setError] = useState<boolean>(false)
  const [formLoading, setFormLoading] = useState<boolean>(false)

  const { enqueueSnackbar } = useSnackbar()
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = (data: BookType) => {
    setFormLoading(true)
    console.log(data)

    dispatch(addNewBook(data))
      .then(() => {
        enqueueSnackbar('Libro creado correctamente', { variant: 'success', autoHideDuration: 2500 })
        router.push('/')
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setFormLoading(false)
      })
  }

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
          Crear Libro
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <form onSubmit={handleSubmit(onSubmit)} >
          <FormControl fullWidth sx={{ mb: 4 }}>
            <Typography variant='body1' mb={1}>Título</Typography>
            <Controller
              name='title'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <TextField
                  autoFocus
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  error={Boolean(errors.title)}
                  placeholder='Título'
                />
              )}
            />
            {errors.title && <FormHelperText sx={{ color: 'error.main' }}>{errors.title.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <Typography variant='body1' mb={1}>Autor</Typography>
            <Controller
              name='author'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <TextField
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  error={Boolean(errors.description)}
                  placeholder='Autor'
                />
              )}
            />
            {errors.author && <FormHelperText sx={{ color: 'error.main' }}>{errors.author.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <Typography variant='body1' mb={1}>Descripcion</Typography>
            <Controller
              name='description'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <TextField
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  error={Boolean(errors.description)}
                  placeholder='Descripcion'
                />
              )}
            />
            {errors.description && <FormHelperText sx={{ color: 'error.main' }}>{errors.description.message}</FormHelperText>}
          </FormControl>
          <Button fullWidth size='large' type='submit' variant='contained' sx={{ mb: 4 }}>
            Crear
          </Button>
        </form>
      </Grid>
    </Grid>
  )
}

export default CreatePage
