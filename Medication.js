import React, { useState, useEffect } from 'react';
import { getPatientMedications } from '../../../services/api';

const Medications = ({ patientId }) => {
  const [medications, setMedications] = useState([]);

  useEffect(() => {
    fetchMedications();
  }, [patientId]);

  const fetchMedications = async () => {
    try {
      const response = await getPatientMedications(patientId);
      setMedications(response.data);
    } catch (error) {
      console.error('Error fetching medications:', error);
    }
  };

  return (
    <div className="medications">
      <h3>Medications</h3>
      {medications.map((medication, index) => (
        <div key={index}>
          <p><strong>Name:</strong> {medication.name}</p>
          <p><strong>Dosage:</strong> {medication.dosage}</p>
          <p><strong>Frequency:</strong> {medication.frequency}</p>
          <p><strong>Start Date:</strong> {medication.start_date}</p>
          <p><strong>End Date:</strong> {medication.end_date}</p>
        </div>
      ))}
    </div>
  );
};

export default Medications;
