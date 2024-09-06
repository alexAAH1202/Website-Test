import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const AppointmentForm = ({ patients, onSubmit, onCancel, onDelete, initialAppointment = null }) => {
  const [appointment, setAppointment] = useState({
    patientId: '',
    date: new Date(),
    duration: 60,
    type: '',
    notes: ''
  });

  useEffect(() => {
    if (initialAppointment) {
      setAppointment(initialAppointment);
    }
  }, [initialAppointment]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAppointment({ ...appointment, [name]: value });
  };

  const handleDateChange = (date) => {
    setAppointment({ ...appointment, date });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(appointment);
  };

  return (
    <form onSubmit={handleSubmit} className="appointment-form">
      <h3>{initialAppointment?.id ? 'Edit Appointment' : 'Schedule New Appointment'}</h3>
      
      <div className="form-group">
        <label htmlFor="patientId">Patient:</label>
        <select
          id="patientId"
          name="patientId"
          value={appointment.patientId}
          onChange={handleInputChange}
          required
        >
          <option value="">Select a patient</option>
          {patients.map(patient => (
            <option key={patient.id} value={patient.id}>
              {patient.first_name} {patient.last_name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="date">Date and Time:</label>
        <DatePicker
          id="date"
          selected={appointment.date}
          onChange={handleDateChange}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          timeCaption="time"
          dateFormat="MMMM d, yyyy h:mm aa"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="duration">Duration (minutes):</label>
        <input
          type="number"
          id="duration"
          name="duration"
          value={appointment.duration}
          onChange={handleInputChange}
          min="15"
          step="15"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="type">Appointment Type:</label>
        <select
          id="type"
          name="type"
          value={appointment.type}
          onChange={handleInputChange}
          required
        >
          <option value="">Select type</option>
          <option value="Initial Consultation">Initial Consultation</option>
        </select>
      </div>

      <div className="form-actions">
        <button type="submit">{initialAppointment?.id ? 'Update' : 'Schedule'}</button>
        <button type="button" onClick={onCancel}>Cancel</button>
        {initialAppointment?.id && (
          <button type="button" onClick={onDelete} className="delete-button">
            Cancel Appointment
          </button>
        )}
      </div>
    </form>
  );
};

export default AppointmentForm;
