export default App;
import React, { useState, useEffect } from 'react';
import { getAppointmentHistory } from '../services/api';

function AppointmentHistory({ patientId }) {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointmentHistory();
  }, [patientId]);

  const fetchAppointmentHistory = async () => {
    try {
      const data = await getAppointmentHistory(patientId);
      setAppointments(data);
    } catch (error) {
      console.error('Error fetching appointment history:', error);
    }
  };

  return (
    <div className="appointment-history">
      <h3>Appointment History</h3>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Practitioner</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map(appointment => (
            <tr key={appointment.id}>
              <td>{appointment.date}</td>
              <td>{appointment.type}</td>
              <td>{appointment.practitioner}</td>
              <td>{appointment.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

