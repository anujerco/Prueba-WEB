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
      <Button onClick={handleSummary}>{textButton}</Button>
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
              <TableCell>Titulo</TableCell>
              <TableCell align="right">Autor</TableCell>
              <TableCell align="right">Descripcion</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.title}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell align="right">{row.author}</TableCell>
                <TableCell align="right">{row.description}</TableCell>
                <TableCell align="right">
                  <Stack direction='row' spacing={2}>
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