import React, { useState, useEffect } from 'react';
import { getPatientDetails, updatePatientDetails } from '../services/api';

function PatientPersonalDetails() {
  const [details, setDetails] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchPatientDetails();
  }, []);

  const fetchPatientDetails = async () => {
    const data = await getPatientDetails();
    setDetails(data);
  };

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updatePatientDetails(details);
    setIsEditing(false);
  };

  return (
    <div className="patient-personal-details">
      <h3>Personal Details</h3>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input name="firstName" value={details.firstName} onChange={handleChange} />
          <input name="lastName" value={details.lastName} onChange={handleChange} />
          <input name="email" value={details.email} onChange={handleChange} />
          <input name="phone" value={details.phone} onChange={handleChange} />
          <button type="submit">Save</button>
        </form>
      ) : (
        <div>
          <p>Name: {details.firstName} {details.lastName}</p>
          <p>Email: {details.email}</p>
          <p>Phone: {details.phone}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      )}
    </div>
  );
}

export default PatientPersonalDetails;