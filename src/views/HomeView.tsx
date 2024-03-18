import { BooksListContainer } from "@/components/BooksListContainer"
import { AppDispatch, RootState } from "@/store"
import { fetchMeBooks } from "@/store/book"
import { Grid, Typography } from "@mui/material"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"



export const HomeView = () => {

  const { meBooks, loading } = useSelector((state: RootState) => state.book)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchMeBooks());
  }, [])



  return (
    <Grid container justifyContent='center'>
      <Grid item xs={6}>
        <Typography variant="h2" align="center">
          Mis Libros
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6" align="center">
          Aqui podras encontrar todos tus libros
        </Typography>
      </Grid>
        {
          meBooks.length === 0
            ? <Typography variant="h6" align="center">No tienes libros</Typography>
            : <>
              <Grid item xs={12}>
                {
                  loading
                    ? <Typography variant="h6" align="center">Cargando...</Typography>
                    : <BooksListContainer bookList={meBooks} />
                }
              </Grid>
            </>
        }

      </Grid>
      )
}
