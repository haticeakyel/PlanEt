import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import Header from './Header';
import React, { useEffect, useState } from 'react';
import january from '../assets/january.jpeg';
import february from '../assets/february.jpeg';
import march from '../assets/march.jpeg';
import april from '../assets/april.jpeg';
import may from '../assets/may.jpeg';
import june from '../assets/june.jpeg';
import july from '../assets/july.jpeg';
import august from '../assets/august.jpeg';
import september from '../assets/september.jpeg';
import october from '../assets/october.png';
import november from '../assets/november.jpeg';
import december from '../assets/december.jpeg';
import AddEvent from './AddEvent';
import { fetchEvents } from '../actions/eventAction';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import EventList from './EventList';
import { authUser } from '../actions/userAction';
import { Dialog, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteEvent from './DeleteEvent';

function FullCalendarApp(props) {
  const {
    fetchEvents,
    events,
    authUser
  } = props;

  const [selectedMonth, setSelectedMonth] = useState(null);
  const [addEvent, setAddEvent] = useState(false);
  const [deleteEvent, setDeleteEvent] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEventAdd = (eventInfo) => {
    const newEvent = {
      title: 'New Event',
      start: eventInfo.startStr,
      end: eventInfo.endStr,
    };
  };

  const handleDatesSet = (dateInfo) => {
    const { start } = dateInfo;
    if (start) {
      const selected = new Date(start);
      setSelectedMonth(selected.getMonth());
    }
  };

  const handleNewButtonClick = () => {
    setAddEvent(true);
  };

  const handleAddEventClose = () => {
    setAddEvent(false);
  };

  const handleDeleteEventClose = () => {
    setDeleteEvent(false);
  };

  const handleEventDelete = (eventId) => {
    setSelectedEvent(eventId);
    setDeleteEvent(true);
  };

  const handleEventDoubleClick = (info) => {
    <Dialog>heyy</Dialog>
    console.log('Double-clicked event:', info.event);
    // Open the dialog or perform any other action here
  };

  const getSelectedMonthImage = () => {
    const imageURLs = [
      january,
      february,
      march,
      april,
      may,
      june,
      july,
      august,
      september,
      october,
      november,
      december,
    ];

    if (selectedMonth !== null && selectedMonth >= 0 && selectedMonth < imageURLs.length) {
      return `url(${imageURLs[selectedMonth]})`;
    }

    return null;
  };

  const navigate = useNavigate();

  useEffect(() => {
    const hasCookie = document.cookie.includes('user_token');
    if (!hasCookie) {
      navigate('/login');
    } else {
      fetchEvents();
      authUser();
    }
  }, [navigate, fetchEvents, authUser]);

  return (
    <>
      <Header />
      <div className="App" style={{ position: 'relative', }}>
        <div
          style={{
            backgroundImage: getSelectedMonthImage(),
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            width: '100%',
            height: '100%',
            opacity: 0.5,
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: -1,
          }}
        ></div>
        <AddEvent open={addEvent} onClose={handleAddEventClose} />

        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            center: 'dayGridMonth,timeGridWeek,timeGridDay new',
          }}
          customButtons={{
            new: {
              text: 'New',
              click: handleNewButtonClick,
            },
          }}
          selectable={true}
          select={handleEventAdd}
          events={events.events && events.events.map((event) => ({
            title: event.title,
            start: event.startDate,
            end: event.endDate,
            id: event.id,
          }))}
          eventContent={(eventContent) => (
            <div
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.5)', // Set the background color to transparent
                padding: '4px',
                display: 'flex',
              }}
              onDoubleClick={() => handleEventDoubleClick(eventContent)}
            >
              <div>{eventContent.event.title}</div>
              <IconButton
                aria-label="delete"
                size="small"
                onClick={() => handleEventDelete(eventContent.event.id)}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </div>
          )}
          datesSet={handleDatesSet}
        />
      </div>
      {deleteEvent && selectedEvent && (
        <DeleteEvent open={deleteEvent} onClose={handleDeleteEventClose} id={selectedEvent} />
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  events: state.events,
  user: state.user
});

const mapDispatchToProps = (dispatch) => ({
  fetchEvents: () => {
    dispatch(fetchEvents());
  },
  authUser: () => {
    dispatch(authUser());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(FullCalendarApp);