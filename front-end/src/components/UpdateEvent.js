import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Snackbar, Switch, TextField } from '@mui/material'
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, MobileDateTimePicker } from '@mui/x-date-pickers';
import { fetchEventById } from '../actions/anEventAction';
import { updateEvent } from '../actions/eventAction';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault('UTC');

function UpdateEvent(props) {
  const {
    open,
    onClose,
    eventId,
    userId,
    fetchEventById,
    event,
    updateEvent
  } = props;

  const [title, setTitle] = useState(event.title);
  const [description, setDescription] = useState(event.description);
  const [status, setStatus] = useState(event.status);
  const [startDateTime, setStartDateTime] = useState(dayjs(event.startDate));
  const [endDateTime, setEndDateTime] = useState(dayjs(event.endDate));
  const [alert, setAlert] = useState({ open: false, message: "", status: "" }); 
  const [fetchedEvent, setFetchedEvent] = useState("")
  
  useEffect(() => {
   fetchEventById(userId, eventId)
   
  }, [open])
  useEffect(() => {
    setTitle(event.title)
    setDescription(event.description)
    setStatus(event.status)
  }, [event])
  
  const handleClick = async () => {
    
    
/*     const updatedEvent = {
      id: eventId,
      title: title,
      description: description,
      status: status,
      startDate: startDateTime,
      endDate: endDateTime,
    };

    try {
      await updateEvent(userId, updatedEvent);
      setAlert({ open: true, message: "Event updated successfully", status: "success" });
      onClose();
    } catch (error) {
      console.log('Error updating event:', error);
      setAlert({ open: true, message: "Error updating event", status: "error" });
    } */
  };

  const isDisabled = () => {
    return !title || !description;
  };

  const handleChange = (event) => {
    setStatus(event.target.checked);
  };

  const handleStartDateTimeChange = (newStartDateTime) => {
    setStartDateTime(newStartDateTime);

    if (endDateTime.isBefore(newStartDateTime)) {
      setEndDateTime(newStartDateTime);
    }
  };

  const handleEndDateTimeChange = (newEndDateTime) => {
    setEndDateTime(newEndDateTime);

    if (newEndDateTime.isBefore(startDateTime)) {
      setStartDateTime(newEndDateTime);
    }
  };

    
  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle style={{ textAlign: "center" }} id="add-new-event-dialog-title">Update Event</DialogTitle>
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
            Update
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
  );
}

const mapStateToProps = (state) => ({
  userId: state.user.id,
  events: state.events,
  event: state.event
});

const mapDispatchToProps = (dispatch) => ({
  fetchEventById: (userId, event) => {
    return dispatch(fetchEventById(userId, event));
  },
  updateEvent: (userId, event) => {
    return dispatch(updateEvent(userId, event));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateEvent);
