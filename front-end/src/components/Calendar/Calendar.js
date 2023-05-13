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
          end: eventInfo.endStr,// Set the end date/time of the event
        };
    
        setEvents([...events, newEvent]);
      };
    return (
      <div className="App">
      <Header/>
      
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          /* headerToolbar = {{
            start: 'title',
            center: '',   
            end: 'today prev,next'
          }} */
          headerToolbar={{
            center: 'dayGridMonth,timeGridWeek,timeGridDay new',
          }}
          customButtons={{
            new: {
              text: 'New',
              click: handleEventAdd, // Call the handleEventAdd function when the "New" button is clicked
            },
          }}
          selectable={true} // Enable the ability to select a day on the calendar
        select={handleEventAdd} // Call the handleEventAdd function when a day is selected
        events={events}
        />
      </div>
    );
  }

  export default FullCalendarApp;