import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import Header from '../Header';
import React from 'react';

function FullCalendarApp() {
  const [events, setEvents] = React.useState([]);

  const handleEventAdd = (eventInfo) => {
    const newEvent = {
      title: 'New Event',
      start: eventInfo.startStr,
      end: eventInfo.endStr,
    };

    setEvents([...events, newEvent]);
  };

  // Generate the background image URL based on the current month
  const getCurrentMonthImage = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const imageURLs = [
      '/path/to/january.jpg',
      '/path/to/february.jpg',
      '/path/to/march.jpg',
      // Add URLs for the remaining months
    ];
    return imageURLs[currentMonth];
  };

  return (
    <div className="App" style={{ backgroundImage: `url(${getCurrentMonthImage()})` }}>
      <Header />

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          center: 'dayGridMonth,timeGridWeek,timeGridDay new',
        }}
        customButtons={{
          new: {
            text: 'New',
            click: handleEventAdd,
          },
        }}
        selectable={true}
        select={handleEventAdd}
        events={events}
      />
    </div>
  );
}

export default FullCalendarApp;
