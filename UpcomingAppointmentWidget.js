import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUpcomingAppointments } from '../services/api';

function UpcomingAppointmentsWidget() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const data = await getUpcomingAppointments();
      setAppointments(data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  return (
    <div className="dashboard-widget upcoming-appointments">
      <h2>Upcoming Appointments</h2>
      <ul>
        {appointments.map(appointment => (
          <li key={appointment.id}>
            {appointment.patientName} - {appointment.date} {appointment.time}
          </li>
        ))}
      </ul>
      <Link to="/appointments">View All Appointments</Link>
    </div>
  );
}

export default UpcomingAppointmentsWidget;
