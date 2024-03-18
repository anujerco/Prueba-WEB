import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { bookDeleted, fetchMeBooks } from '@/store/book';
import { useRouter } from 'next/router';

interface DialogDeleteParams {
  id: number,
  openDialog: boolean,
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>

}


export const DialogDelete = ({id, openDialog, setOpenDialog}:DialogDeleteParams) => {
  
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  
  const router = useRouter();

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleDelete = () => {
    console.log('Eliminando libro', id)
    setLoading(true)
    dispatch(bookDeleted(String(id)))
    .then( () => {
      dispatch(fetchMeBooks())
      router.push('/')
    })
    .catch( (err) => {
      console.log(err)
    })
    .finally( () => {
      setLoading(false)
    })
    handleClose();
  }

  return (
    <React.Fragment>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Eliminar
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿ Esta seguro que desea eliminar el libro ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleDelete} autoFocus>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}