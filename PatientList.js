import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPatients } from '../services/api';
import '../styles/PatientList.css';

function PatientList({ searchResults }) {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    if (searchResults) {
      setPatients(searchResults);
    } else {
      fetchPatients();
    }
  }, [searchResults]);

  const fetchPatients = async () => {
    const data = await getPatients();
    setPatients(data);
  };

  return (
    <div className="patient-list">
      <h2>Patient List</h2>
      <ul>
        {patients.map(patient => (
          <li key={patient.id}>
            <Link to={`/patients/${patient.id}`}>
              {patient.firstName} {patient.lastName}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PatientList;
