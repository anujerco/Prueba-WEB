import { BookType } from "@/types/bookTypes";
import { Controller, useForm } from "react-hook-form";
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, FormControl, FormHelperText, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { editBook } from "@/store/book";
import { useRouter } from "next/router";


interface FormEditBookParams {
  book: BookType;
}


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


export const FormEditBook = ({ book }: FormEditBookParams) => {

  const [formLoading, setFormLoading] = useState<boolean>(false)
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter();

  const defaultValues: defaultValuesInterface = {
    title: book.title,
    author: book.author,
    description: book.description,
  }

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

    const params = {
      id: String(book.id),
      book: data
    }

    dispatch(editBook(params))
      .then(() => {
        router.push('/')
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setFormLoading(false)
      })
  }

  if (formLoading) ( <Typography variant="h6" align="center">Cargando...</Typography>)
    

  return (
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
        Editar
      </Button>
    </form>
  )
}
