import React, { useState, useEffect } from 'react';
import { getPatientAllergies } from '../../../services/api';

const Allergies = ({ patientId }) => {
  const [allergies, setAllergies] = useState([]);

  useEffect(() => {
    fetchAllergies();
  }, [patientId]);

  const fetchAllergies = async () => {
    try {
      const response = await getPatientAllergies(patientId);
      setAllergies(response.data);
    } catch (error) {
      console.error('Error fetching allergies:', error);
    }
  };

  return (
    <div className="allergies">
      <h3>Allergies</h3>
      {allergies.map((allergy, index) => (
        <div key={index}>
          <p><strong>Allergen:</strong> {allergy.allergen}</p>
          <p><strong>Severity:</strong> {allergy.severity}</p>
          <p><strong>Notes:</strong> {allergy.notes}</p>
        </div>
      ))}
    </div>
  );
};

export default Allergies;
