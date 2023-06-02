import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, Snackbar, Switch, TextField } from '@mui/material'
import React, { useState } from 'react'
import dayjs from 'dayjs';
import { addEventApi } from '../api/eventApi';
import { deleteEvent } from '../actions/eventAction';
import { connect } from 'react-redux';

function DeleteEvent(props) {
  const {
    id,
    open,
    onClose,
    deleteEvent
  } = props

  const [deleteAlert, setDeleteAlert] = useState(
    {open: false, message: "", status: ""}
   )

  const [alert, setAlert] = useState({ open: false, message: "", status: "" })

  return (
    <div>
    <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          You are about to delete this event
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you really sure to delete it permanently?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={() => {
            onClose()
            setDeleteAlert({open: true, message: "Event Deleted", status: "success"})
            console.log(id,"dhdhd")
            deleteEvent(id)
          }}
         autoFocus
         >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    <Snackbar
    open={alert.open}
    autoHideDuration={1000}
    onClose={() => setAlert({ open: false, message: "", status: "" })}
>
    <Alert severity={alert.status || "info"}>{alert.message}</Alert>
</Snackbar>
</div>
  )
}

const mapStateToProps = (state) => ({
 event:state.event
});


const mapDispatchToProps = (dispatch) => ({
  deleteEvent: (id) =>{
    dispatch(deleteEvent(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteEvent);
