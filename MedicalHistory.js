import React, { useState, useEffect } from 'react';
import { getPatientMedicalHistory } from '../../../services/api';

const MedicalHistory = ({ patientId }) => {
  const [medicalHistory, setMedicalHistory] = useState([]);

  useEffect(() => {
    fetchMedicalHistory();
  }, [patientId]);

  const fetchMedicalHistory = async () => {
    try {
      const response = await getPatientMedicalHistory(patientId);
      setMedicalHistory(response.data);
    } catch (error) {
      console.error('Error fetching medical history:', error);
    }
  };

  return (
    <div className="medical-history">
      <h3>Medical History</h3>
      {medicalHistory.map((item, index) => (
        <div key={index}>
          <p><strong>Condition:</strong> {item.condition}</p>
          <p><strong>Diagnosis Date:</strong> {item.diagnosis_date}</p>
          <p><strong>Notes:</strong> {item.notes}</p>
        </div>
      ))}
    </div>
  );
};

export default MedicalHistory;
