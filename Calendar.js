import React from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Setup the localizer for BigCalendar
const localizer = momentLocalizer(moment);

const Calendar = ({ appointments, onSelectSlot, onSelectEvent }) => {
  // Convert appointments to the format expected by BigCalendar
  const events = appointments.map(appointment => ({
    id: appointment.id,
    title: `${appointment.patientName} - ${appointment.type}`,
    start: new Date(`${appointment.date}T${appointment.time}`),
    end: new Date(`${appointment.date}T${appointment.time}`).setMinutes(new Date(`${appointment.date}T${appointment.time}`).getMinutes() + appointment.duration),
  }));

  return (
    <div className="calendar">
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        onSelectSlot={onSelectSlot}
        onSelectEvent={onSelectEvent}
        selectable
      />
    </div>
  );
};

export default Calendar;
