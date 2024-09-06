import React, { useState } from 'react';
import { addPatient } from '../services/api';
import '../styles/PatientForm.css';

function PatientForm() {
  const [patient, setPatient] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    phone: ''
  });

  const handleChange = (e) => {
    setPatient({ ...patient, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addPatient(patient);
      console.log('Patient added:', response);
      // Clear form or show success message
    } catch (error) {
      console.error('Error adding patient:', error);
      // Show error message
    }
  };

  return (
    <form onSubmit={handleSubmit} className="patient-form">
      <input
        type="text"
        name="firstName"
        value={patient.firstName}
        onChange={handleChange}
        placeholder="First Name"
        required
      />
      <input
        type="text"
        name="lastName"
        value={patient.lastName}
        onChange={handleChange}
        placeholder="Last Name"
        required
      />
      <input
        type="date"
        name="dateOfBirth"
        value={patient.dateOfBirth}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        value={patient.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        type="tel"
        name="phone"
        value={patient.phone}
        onChange={handleChange}
        placeholder="Phone"
        required
      />
      <button type="submit">Add Patient</button>
    </form>
  );
}

export default PatientForm;
