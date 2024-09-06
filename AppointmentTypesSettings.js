import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { getAppointmentType, createAppointmentType, updateAppointmentType } from '../../../services/api';

function AppointmentTypeList() {
  const { id } = useParams();
  const history = useHistory();
  const [appointmentType, setAppointmentType] = useState({
    name: '',
    duration: 30,
    color: '#000000',
  });

  useEffect(() => {
    if (id && id !== 'new') {
      fetchAppointmentType();
    }
  }, [id]);

  const fetchAppointmentType = async () => {
    try {
      const data = await getAppointmentType(id);
      setAppointmentType(data);
    } catch (error) {
      console.error('Error fetching appointment type:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointmentType((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id === 'new') {
        await createAppointmentType(appointmentType);
      } else {
        await updateAppointmentType(id, appointmentType);
      }
      history.push('/settings/appointments/types');
    } catch (error) {
      console.error('Error saving appointment type:', error);
    }
  };

  return (
    <div className="appointment-type-form">
      <h3>{id === 'new' ? 'Add New Appointment Type' : 'Edit Appointment Type'}</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={appointmentType.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="duration">Duration (minutes):</label>
          <input
            type="number"
            id="duration"
            name="duration"
            value={appointmentType.duration}
            onChange={handleChange}
            min="5"
            step="5"
            required
          />
        </div>
        <div>
          <label htmlFor="color">Color:</label>
          <input
            type="color"
            id="color"
            name="color"
            value={appointmentType.color}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Save</button>
        <button type="button" onClick={() => history.push('/settings/appointments/types')}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default AppointmentTypeList;
