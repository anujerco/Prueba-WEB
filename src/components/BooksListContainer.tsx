import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { BookType } from '@/types/bookTypes';
import { useEffect, useState } from 'react';
import { Button, IconButton, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { DialogDelete } from './DialogDelete';

interface BooksListContainerParams {
  bookList: BookType[];
}


export const BooksListContainer = ({ bookList }: BooksListContainerParams) => {

  const [rows, setRows] = useState<BookType[] | []>([])
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [id, setId] = useState<number>(0)
  const [summaryList, setSummaryList] = useState<String[] | []>([])
  const [showSummaryList, setShowSummaryList] = useState<boolean>(false)

  const router = useRouter();

  useEffect(() => {
    setRows(bookList)
    setSummaryList(bookList.map((book:BookType) => book.title))
  }, [bookList])

  const handleDelete = (id: number) => {
    setOpenDialog(true)
    setId(id)
  }

  const handleEdit = (id: number) => {
    router.push(`/edit/${id}`)
  }

  const handleSummary = () => {
    setShowSummaryList(!showSummaryList)
  }

  const textButton = showSummaryList ? 'Ocultar Resumen' : 'Mostrar Resumen'


  return (
    <>
      <DialogDelete id={id} openDialog={openDialog} setOpenDialog={setOpenDialog} />

      <Button 
        onClick={handleSummary}
        variant="contained"
        color="success"
        sx={{m: 2}}
      >
        {textButton}
      </Button>
      <Button 
        onClick={()=> router.push('/create') }
        variant="contained"
        color="success"
        sx={{m: 2}}
      >
        Añadir Libro
      </Button>
      {
        showSummaryList && summaryList.map((title, index) => (
          <p key={index}>{title}</p>
        ))
      }
      {
        !showSummaryList && (
          <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell 
                align='center' 
              >
                Titulo
              </TableCell>
              <TableCell 
                align="center"
              >
                  Autor
              </TableCell>
              <TableCell 
                align="center"
              >
                Descripcion
              </TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.title}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell 
                  component="th" 
                  scope="row"
                  align="center"
                >
                  {row.title}
                </TableCell>
                <TableCell align="center">{row.author}</TableCell>
                <TableCell align="center">{row.description}</TableCell>
                <TableCell align="center">
                  <Stack direction='row' justifyContent='center' spacing={2}>
                    <IconButton aria-label="delete">
                      <DeleteIcon onClick={() => handleDelete(row.id!)} />
                    </IconButton>
                    <IconButton aria-label="delete">
                      <EditIcon onClick={() => handleEdit(row.id!)} />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
        )
      }
    </>
  );
}