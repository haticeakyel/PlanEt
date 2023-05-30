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

function FullCalendarApp() {
  const [events, setEvents] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [addEvent, setAddEvent] = useState(false);

  const handleEventAdd = (eventInfo) => {
    const newEvent = {
      title: 'New Event',
      start: eventInfo.startStr,
      end: eventInfo.endStr,
    };

    setEvents([...events, newEvent]);
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

  // Generate the background image URL based on the selected month
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
    }
  }, [navigate]);

  return (
    <div
      className="App"
      style={{
        backgroundImage: getSelectedMonthImage(),
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
      }}
    >
      <Header />
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
        events={events}
        datesSet={handleDatesSet}
      />
    </div>
  );
}
const mapStateToProps = (state) => ({
  
});

const mapDispatchToProps = (dispatch) => ({
  
});

export default connect(mapStateToProps, mapDispatchToProps)(FullCalendarApp);
