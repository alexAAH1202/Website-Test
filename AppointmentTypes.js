import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAppointmentTypes } from '../../../services/api';

function AppointmentTypes() {
  const [appointmentTypes, setAppointmentTypes] = useState([]);

  useEffect(() => {
    fetchAppointmentTypes();
  }, []);

  const fetchAppointmentTypes = async () => {
    try {
      const data = await getAppointmentTypes();
      setAppointmentTypes(data);
    } catch (error) {
      console.error('Error fetching appointment types:', error);
    }
  };

  return (
    <div className="appointment-types-settings">
      <h3>Appointment Types</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Duration</th>
            <th>Color</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointmentTypes.map((type) => (
            <tr key={type.id}>
              <td>{type.name}</td>
              <td>{type.duration} minutes</td>
              <td>
                <div
                  style={{
                    backgroundColor: type.color,
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                  }}
                />
              </td>
              <td>
                <Link to={`/settings/appointments/types/${type.id}`}>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/settings/appointments/types/new" className="button">
        Add New Appointment Type
      </Link>
    </div>
  );
}

export default AppointmentTypes;
