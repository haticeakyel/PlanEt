import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Snackbar, Switch, TextField } from '@mui/material'
import React, { useState } from 'react'
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, MobileDateTimePicker, StaticDateTimePicker } from '@mui/x-date-pickers';
import { addEventApi } from '../api/eventApi';
import { addEventAct } from '../actions/eventAction';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault('UTC');

function AddEvent(props) {
  const {
    open,
    onClose
  } = props

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState(false)
  const [startDateTime, setStartDateTime] = useState(dayjs());
  const [endDateTime, setEndDateTime] = useState(dayjs());
  const [alert, setAlert] = useState({ open: false, message: "", status: "" })

  const handleClick = async () => {
    const event = {
      title,
      description,
      status,
      startDate: dayjs(startDateTime).utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
      endDate: dayjs(endDateTime).utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
    };
  
    await addEventApi(event)
      .then((res) => {
        addEventAct(res);
        setAlert({ open: true, message: "Event added", status: "success" });
        resetComponent();
        onClose();
      })
      .catch((err) =>
        setAlert({ open: true, message: "error message", status: "error" })
      );
  };
  

  const isDisabled = () => {

  }

  const handleChange = (event) => {
    setStatus(event.target.checked);
  };

  const handleStartDateTimeChange = (newStartDateTime) => {
    setStartDateTime(newStartDateTime);

    // If the selected endDateTime is earlier than the newStartDateTime, update the endDateTime to match the newStartDateTime
    if (endDateTime.isBefore(newStartDateTime)) {
      setEndDateTime(newStartDateTime);
    }
  };

  const handleEndDateTimeChange = (newEndDateTime) => {
    setEndDateTime(newEndDateTime);

    // If the selected endDateTime is earlier than the startDateTime, update the startDateTime to match the newEndDateTime
    if (newEndDateTime.isBefore(startDateTime)) {
      setStartDateTime(newEndDateTime);
    }
  };

  const resetComponent = () =>{
    setTitle("")
    setDescription("")
    setStatus(false)
    setStartDateTime(dayjs())
    setEndDateTime(dayjs())
  }

  return (
    <div>
    <Dialog open={open} onClose={onClose}>
      <DialogTitle style={{ textAlign: "center" }} id="add-new-event-dialog-title">Add New Event</DialogTitle>
      <DialogContent>

        <TextField
          required
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="dense"
          id="eventTitle"
          variant='outlined'
          label={"Title"}
          fullWidth
        />
        <TextField
          required
          autoFocus
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="dense"
          id="description"
          variant='outlined'
          label={"Description"}
          fullWidth
        />
        <FormControlLabel
          control={
            <Switch color="secondary" checked={status} sx={{ m: 1 }} onChange={handleChange} name="status" />
          }
          label="Status Done"
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DateRangePicker, DateRangePicker']}>
          <DemoItem label="Start">
            <MobileDateTimePicker value={startDateTime} onChange={handleStartDateTimeChange} ampm={false} format="DD/MM/YYYY HH:mm" />
          </DemoItem>
          <DemoItem label="End">
            <MobileDateTimePicker value={endDateTime} minDateTime={startDateTime} onChange={handleEndDateTimeChange} ampm={false} format="DD/MM/YYYY HH:mm" />
          </DemoItem>
        </DemoContainer>
      </LocalizationProvider>

      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => handleClick()}
          color="primary"
          disabled={isDisabled()}
        >
          Add
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

export default AddEvent;
