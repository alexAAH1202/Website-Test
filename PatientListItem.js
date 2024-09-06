import React from 'react';
import { Link } from 'react-router-dom';

const PatientListItem = ({ patient }) => {
  return (
    <div className="patient-list-item">
      <Link to={`/patients/${patient.patient_id}`}>
        <h3>{patient.first_name} {patient.last_name}</h3>
        <p>DOB: {patient.date_of_birth}</p>
        <p>Phone: {patient.phone}</p>
      </Link>
    </div>
  );
};

export default PatientListItem;
