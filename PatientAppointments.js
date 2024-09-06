import React, { useState, useEffect } from 'react';
import { getPatientAppointments } from '../services/api';

function PatientAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    const data = await getPatientAppointments();
    setAppointments(data);
  };

  return (
    <div className="patient-appointments">
      <h3>Appointments</h3>
      <h4>Upcoming Appointments</h4>
      <ul>
        {appointments.filter(apt => new Date(apt.date) > new Date()).map(apt => (
          <li key={apt.id}>
            {apt.date} - {apt.type}
          </li>
        ))}
      </ul>
      <h4>Appointment History</h4>
      <ul>
        {appointments.filter(apt => new Date(apt.date) <= new Date()).map(apt => (
          <li key={apt.id}>
            {apt.date} - {apt.type}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PatientAppointments;
